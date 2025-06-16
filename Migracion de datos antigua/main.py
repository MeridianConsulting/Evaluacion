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

# --- Función para enriquecer datos con información relacionada ---
def enrich_dataframes(dataframes):
    """
    Enriquece los dataframes con información relacionada para facilitar
    la comprensión de las relaciones entre tablas.
    """
    # Crear copias para no modificar los originales en caso de error
    enriched_dfs = {}
    
    for table_name, df in dataframes.items():
        enriched_dfs[table_name] = df.copy()
    
    # Enriquecer funciones con nombre_cargo desde cargo
    if 'funciones' in enriched_dfs and 'cargo' in enriched_dfs and not enriched_dfs['funciones'].empty and not enriched_dfs['cargo'].empty:
        try:
            # Crear diccionario de mapeo id_cargo -> nombre_cargo
            cargo_mapping = dict(zip(
                enriched_dfs['cargo']['id_cargo'],
                enriched_dfs['cargo']['nombre_cargo']
            ))
            
            # Añadir columna nombre_cargo a funciones
            enriched_dfs['funciones']['nombre_cargo'] = enriched_dfs['funciones']['id_cargo'].map(cargo_mapping)
            
            print("Relación establecida: funciones -> cargo (usando id_cargo)")
        except Exception as e:
            print(f"Error al enriquecer funciones con cargo: {e}")
    
    # Enriquecer empleados con nombre_cargo
    if 'empleados' in enriched_dfs and 'cargo' in enriched_dfs and not enriched_dfs['empleados'].empty and not enriched_dfs['cargo'].empty:
        try:
            # Crear diccionario de mapeo id_cargo -> nombre_cargo
            cargo_mapping = dict(zip(
                enriched_dfs['cargo']['id_cargo'],
                enriched_dfs['cargo']['nombre_cargo']
            ))
            
            # Añadir columna nombre_cargo a empleados
            enriched_dfs['empleados']['nombre_cargo'] = enriched_dfs['empleados']['cargo'].map(cargo_mapping)
            
            print("Relación establecida: empleados -> cargo (usando cargo)")
        except Exception as e:
            print(f"Error al enriquecer empleados con cargo: {e}")
    
    # Enriquecer evaluacion con nombre_empleado
    if 'evaluacion' in enriched_dfs and 'empleados' in enriched_dfs and not enriched_dfs['evaluacion'].empty and not enriched_dfs['empleados'].empty:
        try:
            # Crear diccionario de mapeo id_empleado -> nombre
            empleado_mapping = dict(zip(
                enriched_dfs['empleados']['id_empleado'],
                enriched_dfs['empleados']['nombre']
            ))
            
            # Añadir columna nombre_empleado a evaluacion
            enriched_dfs['evaluacion']['nombre_empleado'] = enriched_dfs['evaluacion']['id_empleado'].map(empleado_mapping)
            
            print("Relación establecida: evaluacion -> empleados (usando id_empleado)")
        except Exception as e:
            print(f"Error al enriquecer evaluacion con empleados: {e}")
    
    return enriched_dfs

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

        # Enriquecer los dataframes con relaciones
        print("\nEstableciendo relaciones entre tablas...")
        enriched_dfs = enrich_dataframes(dataframes)

        # --- Escribir a Excel con múltiples hojas y formato de tabla ---
        try:
            with pd.ExcelWriter(output_excel, engine='xlsxwriter') as writer:
                workbook = writer.book
                
                # Definir formatos comunes
                title_format = workbook.add_format({
                    'bold': True, 
                    'font_size': 14, 
                    'bg_color': '#4472C4', 
                    'font_color': 'white',
                    'border': 1, 
                    'align': 'center', 
                    'valign': 'vcenter'
                })
                
                header_format = workbook.add_format({
                    'bold': True, 
                    'bg_color': '#D9EAD3', 
                    'border': 1, 
                    'text_wrap': True, 
                    'align': 'center', 
                    'valign': 'top'
                })
                
                relation_format = workbook.add_format({
                    'italic': True, 
                    'font_color': '#1F4E79', 
                    'font_size': 9, 
                    'align': 'center'
                })
                
                # Crear hoja de índice/instrucciones
                index_sheet = workbook.add_worksheet('Índice')
                index_sheet.set_column('A:A', 25)
                index_sheet.set_column('B:B', 60)
                
                # Escribir título e instrucciones
                index_sheet.merge_range('A1:B1', 'BASE DE DATOS RECURSOS HUMANOS', title_format)
                
                index_sheet.write('A3', 'INSTRUCCIONES:', workbook.add_format({'bold': True}))
                index_sheet.write('A4', '1. Navegación:', workbook.add_format({'bold': True}))
                index_sheet.write('B4', 'Use las pestañas inferiores para navegar entre las tablas.')
                index_sheet.write('A5', '2. Filtros:', workbook.add_format({'bold': True}))
                index_sheet.write('B5', 'Cada tabla tiene habilitados filtros. Haga clic en los íconos de filtro para buscar información específica.')
                index_sheet.write('A6', '3. Relaciones:', workbook.add_format({'bold': True}))
                index_sheet.write('B6', 'Las tablas están relacionadas entre sí. Las columnas de relación están marcadas en azul.')
                index_sheet.write('A7', '4. Edición:', workbook.add_format({'bold': True}))
                index_sheet.write('B7', 'Puede editar directamente los datos en las celdas. Guarde el archivo después de cada edición importante.')
                
                # Lista de tablas disponibles
                index_sheet.write('A9', 'TABLAS DISPONIBLES:', workbook.add_format({'bold': True}))
                
                # Crear cada hoja de tabla y añadirla al índice
                for i, (table_name, df) in enumerate(enriched_dfs.items(), 1):
                    if not df.empty:
                        table_display_name = table_name.capitalize()
                        
                        # Crear hoja para la tabla
                        print(f"Creando hoja para tabla '{table_name}'...")
                        worksheet = workbook.add_worksheet(table_display_name)
                        
                        # Escribir encabezado
                        worksheet.merge_range(0, 0, 0, len(df.columns) - 1, f"Tabla: {table_display_name}", title_format)
                        
                        # Determinar relaciones para esta tabla
                        relation_cols = {}
                        
                        if table_name == 'funciones':
                            relation_cols['id_cargo'] = 'Relacionado con tabla Cargo'
                            relation_cols['nombre_cargo'] = 'Obtenido de tabla Cargo'
                        elif table_name == 'empleados' and 'nombre_cargo' in df.columns:
                            relation_cols['cargo'] = 'ID relacionado con tabla Cargo'
                            relation_cols['nombre_cargo'] = 'Obtenido de tabla Cargo'
                        elif table_name == 'evaluacion' and 'nombre_empleado' in df.columns:
                            relation_cols['id_empleado'] = 'Relacionado con tabla Empleados'
                            relation_cols['nombre_empleado'] = 'Obtenido de tabla Empleados'
                        elif table_name == 'detalle_evaluacion':
                            relation_cols['id_evaluacion'] = 'Relacionado con tabla Evaluacion'
                            relation_cols['id_funcion'] = 'Relacionado con tabla Funciones'
                        
                        # Escribir encabezados con formato
                        for col_num, col_name in enumerate(df.columns):
                            cell_format = header_format
                            worksheet.write(2, col_num, col_name, cell_format)
                            
                            # Agregar info de relación si aplica
                            if col_name in relation_cols:
                                worksheet.write(3, col_num, relation_cols[col_name], relation_format)
                        
                        # Escribir datos
                        for row_num, (_, row) in enumerate(df.iterrows(), 4):  # Comienza en fila 4 (después de encabezados)
                            for col_num, cell_value in enumerate(row):
                                worksheet.write(row_num, col_num, cell_value if pd.notna(cell_value) else "")
                        
                        # Añadir formato de tabla con filtros
                        table_range = f'A2:{chr(65 + len(df.columns) - 1)}{len(df) + 4}'  # A2:X20 por ejemplo
                        worksheet.add_table(table_range, {
                            'columns': [{'header': col} for col in df.columns],
                            'style': 'Table Style Medium 2',
                            'first_column': False,
                            'header_row': True,
                            'autofilter': True
                        })
                        
                        # Ajustar ancho de columnas automáticamente
                        for col_num, col_name in enumerate(df.columns):
                            max_width = max(len(str(col_name)), 
                                           df[col_name].astype(str).apply(len).max() if not df.empty else 0)
                            worksheet.set_column(col_num, col_num, max_width + 3)  # +3 para padding
                        
                        # Agregar entrada en el índice
                        index_sheet.write(f'A{9+i}', f"{i}. {table_display_name}")
                        index_sheet.write(f'B{9+i}', f"Contiene {len(df)} registros")
                    else:
                        print(f"Tabla '{table_name}' sin datos, no se creará hoja.")

            print(f"Archivo Excel '{output_excel}' generado con éxito.")
            print("Se han implementado relaciones entre tablas y formato para filtrado.")

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
