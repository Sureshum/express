INSTRUCCIONES PARA USAR LA API REST CON JWT

1. Requisitos previos:
Node.js instalado (v14 o superior)
MongoDB instalado o acceso a una instancia remota
Postman o similar para probar los endpoints

2. Configuración inicial:
Crear un archivo .env basado en .env.example
Configurar MYSQL con tu cadena de conexión
Establecer un JWT_SECRET seguro

3. Instalación:
Ejecutar `npm install` para instalar dependencias
Ejecutar `npm start` para iniciar el servidor

4. Probar la API:

a)realizar un registro:
Realizar una petición POST a /api/auth/register
{
  "username": "nuevo_usuario",
  "email": "nuevo_usuario@example.com",
  "password": "123456"
}

b) Autenticación:
Realizar una petición POST a /api/auth/login con:
  {
    "username": "usuario",
    "password": "contraseña"
  }
Guardar el token devuelto para las siguientes peticiones

b) Dashboard:
Realizar una petición GET a /api/dashboard
Incluir el token en:
  Headers como "x-access-token"
  O como cookie "token"
  
c) Detalle:
Realizar una petición GET a /api/detail/123 (donde 123 es el ID)
Incluir el token como en el paso anterior

5. Notas importantes:
El token expira en 1 minuto
Para probar la expiración, esperar más de 1 minuto e intentar acceder al dashboard
Al expirar el token, se debe volver a autenticar

6. URL de la API en producción:
https://mi-api-wght.onrender.com

