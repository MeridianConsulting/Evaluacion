import pandas as pd
import os
import unicodedata

def normalizar_texto(texto):
    """
    Normaliza el texto a minúsculas y sin acentos para comparación,
    además de quitar espacios en exceso.
    """
    texto = str(texto).strip()
    # Elimina acentos
    texto = ''.join(
        c for c in unicodedata.normalize('NFD', texto)
        if unicodedata.category(c) != 'Mn'
    )
    # Convierte a minúsculas y quita espacios extra
    return " ".join(texto.lower().split())

def generar_sql_migracion(ruta_excel):
    """
    Lee el archivo Excel y genera sentencias SQL para insertar datos en:
      - Tabla cargo (si no existe el cargo, se inserta).
      - Tabla empleados.
      - Tabla funciones (usando el campo 'Hoja Funciones' como identificador).
    
    Se espera que el Excel tenga los siguientes encabezados:
      "Nombres y  Apellidos", "Tipo de documento", "N. de cedula", "Correo", "Cargo", "Area", 
      "Fecha Inicio de Contrato", " A quien reporta directamente", "Nivel", "Hoja Funciones", 
      "OBJETIVO DEL CARGO A EVALUAR", "PROCESO DE GESTION", "proyecto", "ODS"
    """
    # Lee el Excel usando la primera fila como encabezado
    df = pd.read_excel(ruta_excel, engine='openpyxl', header=0)
    
    # Normaliza los nombres de las columnas y construye un diccionario de mapeo
    # (normalizado -> nombre original)
    columnas_map = { normalizar_texto(col): col for col in df.columns }
    
    # Definimos los nombres normalizados que esperamos
    encabezados_esperados = {
        "nombres y apellidos": "nombres y  apellidos",  # Nota: se respeta el doble espacio si es necesario
        "tipo de documento": "tipo de documento",
        "n. de cedula": "n. de cedula",
        "correo": "correo",
        "cargo": "cargo",
        "area": "area",
        "fecha inicio de contrato": "fecha inicio de contrato",
        "a quien reporta directamente": "a quien reporta directamente",
        "nivel": "nivel",
        "hoja funciones": "hoja funciones",
        "objetivo del cargo a evaluar": "objetivo del cargo a evaluar",
        "proceso de gestion": "proceso de gestion",
        "proyecto": "proyecto",
        "ods": "ods"
    }
    
    # Verificamos que todas las claves esperadas existan en el diccionario normalizado
    for key, literal in encabezados_esperados.items():
        if key not in columnas_map:
            raise ValueError(f"No se encontró la columna esperada (normalizada: '{key}'). Columnas detectadas: {list(columnas_map.keys())}")
    
    # Renombramos las columnas del DataFrame para trabajar con claves normalizadas
    df.rename(columns={ columnas_map[key]: key for key in encabezados_esperados }, inplace=True)
    
    # Reemplaza NaN por cadena vacía
    df = df.fillna("")
    
    # Listas para almacenar las sentencias SQL
    sql_cargo = []
    sql_empleados = []
    sql_funciones = []
    
    # Diccionario para mapear cargo normalizado a id_cargo (para evitar duplicados)
    cargo_mapping = {}
    next_id_cargo = 56  # Ajusta según el AUTO_INCREMENT de tu tabla 'cargo'
    
    # Recorremos cada fila del Excel
    for idx, row in df.iterrows():
        # Extraemos los datos usando los nombres normalizados definidos
        nombre_empleado     = row["nombres y apellidos"].strip()
        tipo_documento      = row["tipo de documento"].strip()
        cedula              = str(row["n. de cedula"]).strip()
        correo              = row["correo"].strip()
        cargo               = row["cargo"].strip()
        area                = row["area"].strip()
        fecha_inicio        = row["fecha inicio de contrato"]
        reporta_directamente= row["a quien reporta directamente"].strip()
        nivel               = row["nivel"].strip()
        hoja_funciones      = row["hoja funciones"].strip()
        objetivo_cargo      = row["objetivo del cargo a evaluar"].strip()
        proceso_gestion     = row["proceso de gestion"].strip()
        proyecto            = row["proyecto"].strip()
        ods                 = row["ods"].strip()
        
        # --- Generación de sentencia para tabla cargo ---
        norm_cargo = normalizar_texto(cargo)
        if norm_cargo not in cargo_mapping:
            # Si es un cargo nuevo, se genera INSERT en cargo
            cargo_safe = cargo.replace("'", "''")
            objetivo_safe = objetivo_cargo.replace("'", "''")
            proceso_safe = proceso_gestion.replace("'", "''")
            sql = f"INSERT INTO cargo (id_cargo, nombre_cargo, descripcion_cargo, objetivo_cargo, proceso_gestion) VALUES ({next_id_cargo}, '{cargo_safe}', '', '{objetivo_safe}', '{proceso_safe}');"
            sql_cargo.append(sql)
            cargo_mapping[norm_cargo] = next_id_cargo
            next_id_cargo += 1
        id_cargo = cargo_mapping[norm_cargo]
        
        # --- Generación de sentencia para tabla empleados ---
        # Valores por defecto para campos que no vienen en el Excel
        default_telefono           = "000000"
        default_compania           = "Desconocida"
        default_telefono_empresa   = "000000"
        default_telefono_internac  = "N/A"
        default_contrasena         = "123456"
        
        nombre_safe   = nombre_empleado.replace("'", "''")
        tipo_doc_safe = tipo_documento.replace("'", "''")
        cedula_safe   = cedula.replace("'", "''")
        correo_safe   = correo.replace("'", "''")
        cargo_safe    = cargo.replace("'", "''")
        area_safe     = area.replace("'", "''")
        reporta_safe  = reporta_directamente.replace("'", "''")
        nivel_safe    = nivel.replace("'", "''")
        proyecto_safe = proyecto.replace("'", "''")
        ods_safe      = ods.replace("'", "''")
        
        if isinstance(fecha_inicio, pd.Timestamp):
            fecha_str = fecha_inicio.strftime("%Y-%m-%d")
        else:
            fecha_str = str(fecha_inicio).strip()
        
        sql = (
            "INSERT INTO empleados (cedula, nombre, tipo_documento, cargo, area, fecha_inicio_contrato, reporta_directamente, nivel, "
            "numero_telefonico, email, compania, telefono_empresa, telefono_internacional, contrasena, proyecto, ods) "
            f"VALUES ('{cedula_safe}', '{nombre_safe}', '{tipo_doc_safe}', '{cargo_safe}', '{area_safe}', '{fecha_str}', "
            f"'{reporta_safe}', '{nivel_safe}', '{default_telefono}', '{correo_safe}', '{default_compania}', '{default_telefono_empresa}', "
            f"'{default_telefono_internac}', '{default_contrasena}', '{proyecto_safe}', '{ods_safe}');"
        )
        sql_empleados.append(sql)
        
        # --- Generación de sentencia para tabla funciones ---
        hoja_funciones_safe = hoja_funciones.replace("'", "''")
        titulo_funcion = hoja_funciones_safe  # Se utiliza el mismo valor para título y PK
        sql = (
            "INSERT INTO funciones (id_cargo, titulo_funcion, descripcion_funcion, tipo_funcion, hoja_funciones, fecha_creacion, fecha_actualizacion, estado) "
            f"VALUES ({id_cargo}, '{titulo_funcion}', '', 'Específica', '{hoja_funciones_safe}', NOW(), NOW(), 'ACTIVO') "
            "ON DUPLICATE KEY UPDATE descripcion_funcion = VALUES(descripcion_funcion), tipo_funcion = VALUES(tipo_funcion), fecha_actualizacion = NOW(), estado = VALUES(estado);"
        )
        sql_funciones.append(sql)
    
    return sql_cargo, sql_empleados, sql_funciones

if __name__ == "__main__":
    # Especifica la ruta absoluta correcta del archivo Excel
    ruta_excel = r"C:\xampp\htdocs\Evaluacion\Migracion de datos\Base personal.xlsx"
    
    try:
        sql_cargo, sql_empleados, sql_funciones = generar_sql_migracion(ruta_excel)
        
        # Combina las sentencias con bloques de transacción
        transaccion_cargo = "START TRANSACTION;\n" + "\n".join(sql_cargo) + "\nCOMMIT;\n"
        transaccion_empleados = "START TRANSACTION;\n" + "\n".join(sql_empleados) + "\nCOMMIT;\n"
        transaccion_funciones = "START TRANSACTION;\n" + "\n".join(sql_funciones) + "\nCOMMIT;\n"
        
        # Guarda los resultados en archivos SQL
        with open("migracion_cargo.sql", "w", encoding="utf-8") as f:
            f.write(transaccion_cargo)
        with open("migracion_empleados.sql", "w", encoding="utf-8") as f:
            f.write(transaccion_empleados)
        with open("migracion_funciones.sql", "w", encoding="utf-8") as f:
            f.write(transaccion_funciones)
        
        print("Sentencias SQL generadas y guardadas en los archivos:")
        print(" - migracion_cargo.sql")
        print(" - migracion_empleados.sql")
        print(" - migracion_funciones.sql")
    except Exception as e:
        print("Error durante la migración:", e)
