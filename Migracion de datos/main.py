import pandas as pd
import re
import xlsxwriter # Necesario para el motor y formato avanzado

# --- Definición del Esquema (basado en el diagrama) ---
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
        # Asumiendo id_funcion como PK basado en su uso en detalle_evaluacion
        'id_funcion', 'id_cargo', 'titulo_funcion', 'descripcion_funcion', 'tipo_funcion',
        'hoja_funciones', 'fecha_creacion', 'fecha_actualizacion', 'estado'
    ],
    'evaluacion': [
        'id_evaluacion', 'id_empleado', 'fecha_evaluacion', 'observaciones_generales'
    ],
    'detalle_evaluacion': [
        'id_detalle_evaluacion', 'id_evaluacion', 'id_funcion', 'comentarios', 'calificacion'
    ]
}

# --- Extracción de Datos (Enfocada en la tabla 'cargo') ---
def extract_cargo_data_from_sql(file_path):
    data = []
    # Regex para capturar valores de la tabla cargo, permitiendo strings vacíos
    cargo_pattern = re.compile(r'\(\s*(\d+)\s*,\s*\'(.*?)\'\s*,\s*\'(.*?)\'\s*,\s*\'(.*?)\'\s*,\s*\'(.*?)\'\s*\)')

    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            for line in file:
                # Asume que las líneas de datos comienzan con '('
                if line.strip().startswith('('):
                     match = cargo_pattern.search(line)
                     if match:
                         # Verifica si el número de grupos coincide con el esquema de 'cargo'
                         if len(match.groups()) == len(schema['cargo']):
                             row_data = {
                                 schema['cargo'][0]: int(match.group(1)), # id_cargo
                                 schema['cargo'][1]: match.group(2),      # nombre_cargo
                                 schema['cargo'][2]: match.group(3),      # descripcion_cargo
                                 schema['cargo'][3]: match.group(4),      # objetivo_cargo
                                 schema['cargo'][4]: match.group(5)       # proceso_gestion
                             }
                             data.append(row_data)
    except FileNotFoundError:
        print(f"Error: El archivo SQL '{file_path}' no fue encontrado.")
        return pd.DataFrame(columns=schema['cargo']) # Devuelve DataFrame vacío

    if not data:
        print(f"Advertencia: No se encontraron datos para la tabla 'cargo' en {file_path} con el patrón esperado.")
        return pd.DataFrame(columns=schema['cargo'])

    return pd.DataFrame(data)

# --- Función Principal ---
def main():
    sql_file = 'backend/database/evaluacion.sql'
    output_excel = 'Database_Structure_RRHH.xlsx' # Nombre del archivo de salida

    print(f"Procesando archivo SQL: {sql_file}")
    print(f"Generando archivo Excel: {output_excel}")

    # --- Crear DataFrames ---
    df_cargo = extract_cargo_data_from_sql(sql_file)
    print(f"Datos extraídos para 'cargo': {len(df_cargo)} filas.")

    # Crear DataFrames vacíos para las otras tablas según el esquema
    df_empleados = pd.DataFrame(columns=schema['empleados'])
    df_funciones = pd.DataFrame(columns=schema['funciones'])
    df_evaluacion = pd.DataFrame(columns=schema['evaluacion'])
    df_detalle_evaluacion = pd.DataFrame(columns=schema['detalle_evaluacion'])
    print("DataFrames creados (vacíos para tablas sin datos encontrados en el SQL).")

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
                
                num_cols = len(df.columns) if not df.empty else 5 # Ancho mínimo para el título
                if num_cols == 0: num_cols = 5 # Asegurar un ancho mínimo

                # Escribir Título de la Tabla (combinando celdas)
                worksheet.merge_range(start_row, 0, start_row + 1, num_cols - 1, f"Tabla: {table_name}", title_format)
                start_row += 2 # Avanzar 2 filas para el título

                # Escribir Encabezados y Notas de Relación
                max_col_widths = {} # Diccionario para almacenar anchos de columna
                for col_num, value in enumerate(df.columns):
                    worksheet.write(start_row, col_num, value, header_format)
                    max_col_widths[col_num] = len(value) # Ancho inicial basado en encabezado

                    # Añadir notas de relación FK debajo del encabezado
                    relation_note = ""
                    # Añade aquí lógica específica basada en tu diagrama para cada FK
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
                         max_col_widths[col_num] = max(max_col_widths[col_num], len(relation_note))


                data_start_row = start_row + 2 # Los datos comienzan después del encabezado y la nota de relación

                # Escribir datos del DataFrame
                if not df.empty:
                    for r_idx, row in enumerate(df.itertuples(index=False), start=data_start_row):
                        for c_idx, val in enumerate(row):
                             cell_value = val if pd.notna(val) else "" # Manejar NaN
                             worksheet.write(r_idx, c_idx, cell_value, data_format)
                             # Actualizar ancho máximo de columna
                             max_col_widths[c_idx] = max(max_col_widths.get(c_idx, 0), len(str(cell_value)))
                    data_rows = len(df)
                else:
                    # Mensaje para tablas sin datos
                    worksheet.merge_range(data_start_row, 0, data_start_row, num_cols -1,
                                          "(No se encontraron datos en el archivo SQL)", empty_data_format)
                    data_rows = 1 # Altura mínima para el mensaje

                # Ajustar ancho de columnas para esta sección (basado en contenido y encabezado)
                for col_num, width in max_col_widths.items():
                    # Añadir un pequeño padding
                    worksheet.set_column(col_num, col_num, width + 3)

                # Devolver la siguiente fila disponible, añadiendo espacio
                return data_start_row + data_rows + 2 # Espacio después de la tabla


            # --- Escribir cada tabla en la hoja ---
            print("Escribiendo tabla 'empleados' en Excel...")
            current_row = write_table_section(df_empleados, 'empleados', current_row)

            print("Escribiendo tabla 'cargo' en Excel...")
            current_row = write_table_section(df_cargo, 'cargo', current_row)

            print("Escribiendo tabla 'funciones' en Excel...")
            current_row = write_table_section(df_funciones, 'funciones', current_row)

            print("Escribiendo tabla 'evaluacion' en Excel...")
            current_row = write_table_section(df_evaluacion, 'evaluacion', current_row)

            print("Escribiendo tabla 'detalle_evaluacion' en Excel...")
            current_row = write_table_section(df_detalle_evaluacion, 'detalle_evaluacion', current_row)

        print(f"Archivo Excel '{output_excel}' generado con éxito.")

    except Exception as e:
        print(f"Se produjo un error al generar el archivo Excel: {e}")


if __name__ == "__main__":
    main()
