import mysql.connector
from mysql.connector import Error

def agregar_campo_contrasena(host, user, password, database):
    try:
        # Conectar a la base de datos MySQL
        connection = mysql.connector.connect(
            host=host,
            user=user,
            password=password,
            database=database
        )
        
        if connection.is_connected():
            print("Conexión exitosa a MySQL.")
            cursor = connection.cursor()

            # Verificar si el campo 'contrasena' ya existe en la tabla 'empleados'
            cursor.execute("SHOW COLUMNS FROM empleados LIKE 'contrasena'")
            result = cursor.fetchone()
            
            if not result:
                # Agregar el campo 'contrasena'
                cursor.execute("ALTER TABLE empleados ADD COLUMN contrasena VARCHAR(255)")
                connection.commit()
                print("Campo 'contrasena' agregado a la tabla empleados.")
            else:
                print("El campo 'contrasena' ya existe en la tabla empleados.")

            # Determinar el campo identificador, se asume que es 'cedula' o 'id'
            cursor.execute("SHOW COLUMNS FROM empleados LIKE 'cedula'")
            result_cedula = cursor.fetchone()
            if result_cedula:
                campo_id = 'cedula'
            else:
                cursor.execute("SHOW COLUMNS FROM empleados LIKE 'id'")
                result_id = cursor.fetchone()
                if result_id:
                    campo_id = 'id'
                else:
                    print("No se encontró un campo identificador en la tabla empleados.")
                    return

            # Actualizar el campo 'contrasena' para cada registro usando CONCAT de MySQL
            update_query = f"UPDATE empleados SET contrasena = CONCAT('CC', {campo_id})"
            cursor.execute(update_query)
            connection.commit()
            print("Se ha actualizado el campo 'contrasena' para todos los empleados.")
            
    except Error as e:
        print("Error al conectar a MySQL:", e)
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()
            print("Conexión cerrada.")

if __name__ == '__main__':
    # Configura tus parámetros de conexión
    host = "localhost"          # o la dirección de tu servidor MySQL
    user = "root"         # tu usuario de MySQL
    password = ""  # tu contraseña de MySQL
    database = "evaluacion"     # el nombre de tu base de datos

    agregar_campo_contrasena(host, user, password, database)
