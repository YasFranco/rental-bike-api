# TRABAJO INTEGRADOR MODULO IV - API REST

## Descripción del proyecto

Este proyecto consiste en una API REST diseñada para gestionar un sistema de alquiler de bicicletas. Utiliza tecnologías como NodeJS y Express, así como otras dependencias como randomUUID, zod y jsonfile.

La API permite a los usuarios realizar una variedad de acciones, incluyendo el registro de usuarios, inicio de sesión, gestión de perfiles de usuario, operaciones CRUD en bicicletas y más.


Para ejecutar esta aplicación, es necesario tener instalado Node.js y las siguientes dependencias:

- Express.js
- jsonfile
- crypto (módulo de Node.js para encriptación de contraseñas)

## Configuración

Antes de iniciar la aplicación, asegúrate de configurar las variables de entorno necesarias en el archivo `.env`, incluyendo el puerto de escucha y cualquier otra configuración específica requerida.

Para poder ejecutar los procesos detallados a continuacion se debe levantar el servidor con el siguiente comando de Node

```bash
npm run start
```


## Información util para el usuario 

En la API, se encuentra una función fundamental llamada loginUsers(), que permite que los usuarios inicien sesion para que solo los usuarios autorizados puedan realizar ciertas acciones. 

### requieren sesion iniciada

- **Obtener lista de usuarios:** Permite ver todos los usuarios registrados en el sistema.
- **Ver detalles de usuario:** Proporciona información detallada sobre un usuario específico.
- **Actualizar perfil:** Permite al usuario actualizar su información personal, como correo electrónico, contraseña o número de teléfono.
- **Eliminar cuenta:** Elimina permanentemente la cuenta del usuario del sistema.
- **Registrar nueva bicicleta:** Permite a los usuarios registrados agregar una nueva bicicleta al sistema.
- **Modificar información de bicicleta:** Permite a los usuarios actualizar los detalles de una bicicleta existente, como el tipo, modelo, color, precio y cantidad disponible.
- **Eliminar bicicleta:** Elimina una bicicleta específica del inventario.
- **Cerrar sesión:** Finaliza la sesión actual del usuario.

### Sin sesion iniciada: 

- **Registro de usuario:** Permite a los nuevos usuarios registrarse en la plataforma.
- **Inicio de sesión:** Permite a los usuarios registrados iniciar sesión en sus cuentas existentes.
- **Ver todas las bicicletas:** Permite ver una lista completa de todas las bicicletas disponibles en el sistema.
- **Buscar bicicleta por ID:** Permite buscar y ver los detalles de una bicicleta específica utilizando su identificador único.
- **Ver top 5 de bicicletas más populares:** Muestra las 5 bicicletas más populares y solicitadas en el sistema.


## ENDPOINTS PARA LA EJECUCION DE ACCIONES

```bash
### Leer informacion 
GET http://localhost:5554/api


### Mostrar todos los usuarios
GET http://localhost:5554/api/users
Authorization: 


### Mostrar usuario buscado por email
GET http://localhost:5554/api/users/eliana.men@gmail.com
Authorization: 

### Crear un nuevo usuario
POST http://localhost:5554/api/users/register
Content-Type: application/json
Authorization: 

{
    "username": "prueba",
    "email": "prueba@gmail.com",
    "password": "prueba123",
    "phone": 1235461134
}

### Login 
POST http://localhost:5554/api/users/login
Content-Type: application/json

{
    "username": "prueba",
    "password": "prueba123"
}

### Borrar usuario
DELETE http://localhost:5554/api/users/prueba
Content-Type: application/json

### Actualizar datos usuario 
PATCH http://localhost:5554/api/users/prueba
Content-Type: application/json
Authorization: 

{
    "email": "prueba"
    
}

### Logout
DELETE http://localhost:5554/api/users/logout
Content-Type: application/json
Authorization: 

{
    "username": "prueba"
}

### Mostrar todas las bicicletas
GET http://localhost:5554/api/bikes/
Authorization: 

### Crear una nueva bicicleta
POST http://localhost:5554/api/bikes/
Content-Type: application/json
Authorization: 

{
    "type": "prueba123",
    "model": "modelo1",
    "colour": [
                "negro",
                "blanco",
                "verde"
            ],
    "priceHour": 566,
    "quantity": 3
}

### Borrar bicicleta
DELETE http://localhost:5554/api/bikes/1be994da-6059-4565-8897-9934f17adb89
Authorization: 

### Actualizar datos
PATCH http://localhost:5554/api/bikes/e87ea8c9-8833-4e6f-b6d2-7563fee31567
Content-Type: application/json
Authorization: 

{
    "priceHour": 900
}

### Buscar bicicleta por id 
GET http://localhost:5554/api/bikes/g90ea8c9-8833-4e6f-b6d2-7563fee32696