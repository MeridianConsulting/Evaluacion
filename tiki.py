# Importamos las librerías necesarias
import pandas as pd       # Para leer el archivo Excel
import requests           # Para hacer peticiones HTTP (enviar datos a la API)
import json               # Para convertir los datos a formato JSON

# ---------------------------
# Paso 1: Leer datos del Excel
# ---------------------------
# Supongamos que el archivo "contabilidad.xlsx" tiene columnas: fecha, tipo, monto, proyecto, categoria
# Lee el archivo Excel y lo guarda en un DataFrame (una tabla de datos)
df = pd.read_excel('contabilidad.xlsx')

# Mostramos las primeras filas para confirmar que se han leído correctamente
print("Datos leídos del Excel:")
print(df.head())

# ---------------------------
# Paso 2: Convertir los datos a formato JSON
# ---------------------------
# Creamos una lista para guardar cada registro de datos (cada fila del Excel)
datos = []

# Recorremos cada fila del DataFrame
for index, row in df.iterrows():
    # Creamos un diccionario para cada registro
    registro = {
        "fecha": str(row["fecha"]),        # Convertimos a cadena para asegurar el formato
        "tipo": row["tipo"],                # Por ejemplo: "ingreso" o "egreso"
        "monto": row["monto"],
        "proyecto": row["proyecto"],
        "categoria": row["categoria"]
    }
    # Añadimos el registro a la lista
    datos.append(registro)

# Convertimos la lista de registros a una cadena JSON
datos_json = json.dumps(datos)

# Mostramos el JSON generado
print("Datos convertidos a JSON:")
print(datos_json)

# ---------------------------
# Paso 3: Enviar los datos a Siigo mediante su API RESTful
# ---------------------------
# Suponemos que la API de Siigo tiene un endpoint para movimientos contables en la siguiente URL
url_api = "https://api.siigo.com/v1/movimientos"
# El token de autenticación que se obtiene al ingresar a Siigo (reemplaza "tu_token_aqui" por el valor real)
token = "tu_token_aqui"

# Definimos los headers de la petición: autenticación y tipo de contenido (JSON)
headers = {
    "Authorization": f"Bearer {token}",
    "Content-Type": "application/json"
}

# Enviamos los datos a la API con una petición POST
response = requests.post(url_api, data=datos_json, headers=headers)

# Mostramos el estado y la respuesta de la API para saber si se realizó correctamente
print("Respuesta de la API:")
print("Código de estado:", response.status_code)
print("Contenido:", response.text)
