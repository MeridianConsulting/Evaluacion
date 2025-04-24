import pandas as pd
import re
import xlsxwriter # Necesario para el motor y formato avanzado
import os

# --- Definición del Esquema (MODIFICADO para funciones) ---
schema = {
    'empleados': [
        'id_empleado', 'cedula', 'nombre', 'tipo_documento', 'cargo', 'area',
        'fecha_inicio_contrato', 'reporta_directamente', 'nivel', 'numero_telefonico',
        'email', 'compania', 'telefono_empresa', 'telefono_internacional',
        'contrasena', 'proyecto', 'ods'
    ],
    'cargo': [
        'id_cargo', 'nombre_cargo', 'descripcion_cargo', 'objetivo_cargo', 'proceso_gestion'
    ],
    'funciones': [
        # Se elimina 'id_funcion' porque no está en el INSERT
        'id_cargo', 'titulo_funcion', 'descripcion_funcion', 'tipo_funcion',
        'hoja_funciones', 'fecha_creacion', 'fecha_actualizacion', 'estado'
    ],
    'evaluacion': [
        'id_evaluacion', 'id_empleado', 'fecha_evaluacion', 'observaciones_generales'
    ],
    'detalle_evaluacion': [
        'id_detalle_evaluacion', 'id_evaluacion', 'id_funcion', 'comentarios', 'calificacion'
    ]
}

# --- Función para verificar y obtener la ruta correcta del archivo SQL ---
def get_sql_file_path():
    # Ruta exacta del archivo SQL
    exact_path = r'C:\xampp\htdocs\Evaluacion\backend\database\evaluacion.sql'
    
    if os.path.exists(exact_path):
        print(f"Archivo SQL encontrado en: {exact_path}")
        return exact_path
    
    # Lista de rutas alternativas como respaldo
    possible_paths = [
        'backend/database/evaluacion.sql',
        '../backend/database/evaluacion.sql',
        './evaluacion.sql',
        'evaluacion.sql'
    ]
    
    # Buscar el archivo en las posibles ubicaciones
    for path in possible_paths:
        if os.path.exists(path):
            print(f"Archivo SQL encontrado en: {path}")
            return path
    
    # Si no se encuentra el archivo, solicitar al usuario la ubicación
    print("No se pudo encontrar el archivo evaluacion.sql automáticamente.")
    print("Por favor, ingrese la ruta completa del archivo SQL:")
    user_path = input().strip('"').strip("'")
    
    if os.path.exists(user_path):
        return user_path
    else:
        raise FileNotFoundError(f"No se pudo encontrar el archivo SQL en: {user_path}")

# --- NUEVA Función de Extracción Específica por Tabla ---
def extract_data_for_table(file_path, table_name):
    """
    Extrae datos específicamente para la tabla dada, buscando sus
    sentencias INSERT INTO ... VALUES (...).
    """
    data = []
    # Regex para encontrar la línea INSERT INTO `table_name` (...) VALUES
    # Permite variaciones en espacios y backticks opcionales en nombres de tabla/columnas
    insert_pattern_str = r"INSERT\s+INTO\s+[`]?{}[`]?\s+\(.*?\)\s+VALUES".format(re.escape(table_name))
    insert_pattern = re.compile(insert_pattern_str, re.IGNORECASE)

    # Regex para extraer los valores dentro de cada tupla (...)
    # Maneja strings ('...'), números (123), y NULL
    values_pattern = re.compile(r"\((.*?)\)")

    # Número esperado de campos según el schema MODIFICADO
    expected_fields = len(schema[table_name])

    parsing_table = False
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            for line in file:
                line = line.strip()
                if not line:
                    continue

                # Detectar inicio de sección VALUES para la tabla correcta
                if insert_pattern.search(line):
                    parsing_table = True
                    print(f"Detectado INSERT para la tabla '{table_name}'...")
                    continue # Pasar a la siguiente línea para buscar los datos

                # Si estamos en la sección correcta, buscar tuplas de datos
                if parsing_table:
                    # Buscar todas las tuplas (...) en la línea
                    matches = values_pattern.findall(line)
                    for match_content in matches:
                        # Separar valores dentro de la tupla
                        values = []
                        current_value = ""
                        in_quotes = False
                        escape_next = False

                        for char in match_content:
                             if escape_next:
                                 current_value += char
                                 escape_next = False
                             elif char == '\\':
                                 escape_next = True
                                 current_value += char # Keep backslash if needed
                             elif char == "'" and not in_quotes:
                                 in_quotes = True
                                 current_value += char
                             elif char == "'" and in_quotes:
                                 in_quotes = False
                                 current_value += char
                             elif char == ',' and not in_quotes:
                                 values.append(current_value.strip())
                                 current_value = ""
                             else:
                                 current_value += char
                        
                        # Agregar el último valor
                        if current_value:
                             values.append(current_value.strip())

                        # Limpiar valores (quitar comillas, manejar NULL)
                        cleaned_values = []
                        for val in values:
                            if val.startswith("'") and val.endswith("'"):
                                cleaned_values.append(val[1:-1].replace("\\'", "'")) # Quitar comillas y manejar escapes
                            elif val.upper() == 'NULL':
                                cleaned_values.append(None)
                            elif val.isdigit():
                                cleaned_values.append(int(val)) # Convertir números enteros
                            else:
                                # Intentar convertir a float si parece decimal
                                try:
                                    cleaned_values.append(float(val))
                                except ValueError:
                                     cleaned_values.append(val) # Mantener como string si no es número

                        # Verificar si el número de campos coincide
                        if len(cleaned_values) == expected_fields:
                             row_data = dict(zip(schema[table_name], cleaned_values))
                             data.append(row_data)
                        # else:
                             # print(f"  - Ignorando fila para '{table_name}' con {len(cleaned_values)} campos (esperados {expected_fields}): {cleaned_values[:5]}...")


                    # Detectar fin de la sección VALUES (línea termina con ;)
                    if line.endswith(';'):
                        parsing_table = False

    except FileNotFoundError:
        print(f"Error: El archivo SQL '{file_path}' no fue encontrado.")
        return pd.DataFrame(columns=schema[table_name])
    except Exception as e:
        print(f"Error al procesar el archivo para la tabla '{table_name}': {e}")
        return pd.DataFrame(columns=schema[table_name])

    if not data:
        print(f"Advertencia: No se encontraron datos válidos para la tabla '{table_name}' en {file_path} con el formato esperado.")

    return pd.DataFrame(data)

# --- Función Principal (actualizada) ---
def main():
    try:
        # Obtener la ruta correcta del archivo SQL
        sql_file = get_sql_file_path()
        output_excel = 'Database_Structure_RRHH.xlsx'

        print(f"Procesando archivo SQL: {sql_file}")
        print(f"Generando archivo Excel: {output_excel}")

        # Extraer datos para cada tabla usando la nueva función
        dataframes = {}
        for table_name in schema.keys():
            print(f"\nExtrayendo datos de la tabla '{table_name}'...")
            df = extract_data_for_table(sql_file, table_name)

            # Eliminar duplicados SOLO si NO es la tabla 'funciones'
            # Y si la tabla tiene una columna ID definida como la primera en el schema
            if table_name != 'funciones' and not df.empty and schema[table_name][0] in df.columns:
                id_col = schema[table_name][0]
                print(f"  - Eliminando duplicados basados en '{id_col}' para la tabla '{table_name}'...")
                try:
                    # Intentar convertir la columna ID a numérica antes de eliminar duplicados
                    df[id_col] = pd.to_numeric(df[id_col], errors='coerce')
                    df.dropna(subset=[id_col], inplace=True) # Eliminar filas donde el ID no es numérico
                    if not df.empty: # Verificar si quedan filas después de eliminar NaNs
                         df[id_col] = df[id_col].astype(int) # Convertir a entero
                         original_count = len(df)
                         df = df.drop_duplicates(subset=[id_col], keep='first')
                         print(f"    - Se eliminaron {original_count - len(df)} filas duplicadas.")
                    else:
                         print(f"    - Todas las filas tenían ID no numérico o inválido.")

                except Exception as e:
                     print(f"  - Advertencia: No se pudo procesar la columna ID '{id_col}' para eliminar duplicados. Error: {e}")
            # Si es la tabla 'funciones', no eliminamos duplicados basados en id_cargo
            elif table_name == 'funciones':
                 print(f"  - No se eliminarán duplicados para '{table_name}' para permitir múltiples funciones por cargo.")


            dataframes[table_name] = df
            print(f"  - {len(dataframes[table_name])} filas únicas/totales encontradas para la tabla '{table_name}'")


        # --- Escribir a Excel en una sola hoja ---
        try:
            with pd.ExcelWriter(output_excel, engine='xlsxwriter') as writer:
                workbook = writer.book
                worksheet_name = 'Database Structure'
                worksheet = workbook.add_worksheet(worksheet_name)

                # Definir formatos
                title_format = workbook.add_format({'bold': True, 'font_size': 14, 'bg_color': '#BFBFBF', 'border': 1, 'align': 'center', 'valign': 'vcenter'})
                header_format = workbook.add_format({'bold': True, 'bg_color': '#D9EAD3', 'border': 1, 'text_wrap': True, 'align': 'center', 'valign': 'top'})
                relation_format = workbook.add_format({'italic': True, 'font_color': '#595959', 'font_size': 9})
                data_format = workbook.add_format({'border': 1, 'valign': 'top'}) # Formato para celdas de datos
                empty_data_format = workbook.add_format({'italic': True, 'font_color': 'gray', 'align': 'center'})

                current_row = 0 # Fila actual para escribir

                # --- Función interna para escribir una sección de tabla ---
                def write_table_section(df, table_name, start_row):
                    nonlocal worksheet, writer # Permitir modificar variables del ámbito exterior
                    
                    # Schema a usar para encabezados (el original, con todos los campos)
                    original_schema_cols = []
                    if table_name == 'funciones':
                         original_schema_cols = ['id_funcion'] + schema[table_name] # Añadir id_funcion de vuelta para el encabezado
                    else:
                         original_schema_cols = schema[table_name]
                         
                    num_cols = len(original_schema_cols) # Usar schema original para ancho

                    # Escribir Título de la Tabla (combinando celdas)
                    worksheet.merge_range(start_row, 0, start_row + 1, num_cols - 1, f"Tabla: {table_name}", title_format)
                    start_row += 2 # Avanzar 2 filas para el título

                    # Escribir Encabezados y Notas de Relación
                    max_col_widths = {} # Diccionario para almacenar anchos de columna
                    for col_num, value in enumerate(original_schema_cols):
                        worksheet.write(start_row, col_num, value, header_format)
                        max_col_widths[col_num] = len(value) # Ancho inicial basado en encabezado

                        # Añadir notas de relación FK debajo del encabezado
                        relation_note = ""
                        # Usar el nombre de la tabla original
                        if table_name == 'funciones' and value == 'id_cargo':
                            relation_note = "-> cargo(id_cargo)"
                        elif table_name == 'evaluacion' and value == 'id_empleado':
                            relation_note = "-> empleados(id_empleado)"
                        elif table_name == 'detalle_evaluacion':
                            if value == 'id_evaluacion':
                                relation_note = "-> evaluacion(id_evaluacion)"
                            elif value == 'id_funcion':
                                relation_note = "-> funciones(id_funcion)" # Asumiendo id_funcion es PK

                        if relation_note:
                             # Escribir nota en la fila siguiente
                             worksheet.write(start_row + 1, col_num, relation_note, relation_format)
                             max_col_widths[col_num] = max(max_col_widths.get(col_num, 0), len(relation_note))

                    data_start_row = start_row + 2 # Los datos comienzan después del encabezado y la nota de relación

                    # Escribir datos del DataFrame
                    if not df.empty:
                        # Ajustar DataFrame si es 'funciones' para coincidir con encabezados originales
                        df_to_write = df.copy()
                        if table_name == 'funciones':
                             # Añadir una columna 'id_funcion' vacía al principio si no existe
                             if 'id_funcion' not in df_to_write.columns:
                                  df_to_write.insert(0, 'id_funcion', None) # O un valor por defecto como 'Auto'
                             # Reordenar columnas para que coincidan con original_schema_cols
                             df_to_write = df_to_write[original_schema_cols]


                        for r_idx, row in enumerate(df_to_write.itertuples(index=False), start=data_start_row):
                            for c_idx, val in enumerate(row):
                                 cell_value = val if pd.notna(val) else "" # Manejar NaN
                                 worksheet.write(r_idx, c_idx, cell_value, data_format)
                                 # Actualizar ancho máximo de columna
                                 current_width = max_col_widths.get(c_idx, 0)
                                 max_col_widths[c_idx] = max(current_width, len(str(cell_value)))
                        data_rows = len(df_to_write)
                    else:
                        # Mensaje para tablas sin datos
                        worksheet.merge_range(data_start_row, 0, data_start_row, num_cols -1,
                                              "(No se encontraron datos válidos en el archivo SQL)", empty_data_format)
                        data_rows = 1 # Altura mínima para el mensaje

                    # Ajustar ancho de columnas para esta sección (basado en contenido y encabezado)
                    for col_num, width in max_col_widths.items():
                        # Añadir un pequeño padding
                        worksheet.set_column(col_num, col_num, width + 3 if width > 0 else 10) # Ancho mínimo

                    # Devolver la siguiente fila disponible, añadiendo espacio
                    return data_start_row + data_rows + 2 # Espacio después de la tabla


                # --- Escribir cada tabla en la hoja ---
                for table_name in schema.keys():
                    print(f"Escribiendo tabla '{table_name}' en Excel...")
                    current_row = write_table_section(dataframes[table_name], table_name, current_row)

            print(f"Archivo Excel '{output_excel}' generado con éxito.")

        except Exception as e:
            print(f"Se produjo un error al generar el archivo Excel: {e}")

    except FileNotFoundError as e:
        print(f"\nError: {e}")
        print("\nPor favor, asegúrese de que:")
        print("1. El archivo evaluacion.sql existe")
        print("2. Está ejecutando el script desde la ubicación correcta")
        print("3. La ruta al archivo SQL es correcta")
        return
    except Exception as e:
        print(f"\nError inesperado: {e}")
        return

if __name__ == "__main__":
    main()
