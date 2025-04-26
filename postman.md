Documentación de la API REST con JWT

url (https://railway.com/invite/EkkYtErnp1O)

1. Autenticación

- POST /auth/login
  Autentica un usuario y devuelve un JWT
  Body (JSON):
  {
    "username": "usuario",
    "password": "contraseña"
  }
  
  Respuesta exitosa (200):
  {
    "success": true,
    "message": "Autenticación exitosa",
    "token": "JWT_TOKEN"
  }

- POST /auth/logout
  Cierra la sesión del usuario
  Debe incluir el token en headers (x-access-token) o cookies

2. Dashboard

- GET /dashboard
  Accede al dashboard (requiere JWT válido)
  Debe incluir el token en headers (x-access-token) o cookies
  
  Respuesta exitosa (200):
  {
    "success": true,
    "message": "Bienvenido al Dashboard",
    "user": { ... },
    "data": { ... }
  }

3. Detalle

- GET /detail/:id
  Obtiene detalles de un item específico (requiere JWT válido)
  Debe incluir el token en headers (x-access-token) o cookies
  
  Respuesta exitosa (200):
  {
    "success": true,
    "message": "Detalle del item 123",
    "user": { ... },
    "data": { ... }
  }

Respuestas de error comunes:
- 401: Token inválido o expirado
- 403: Token no proporcionado
- 500: Error interno del servidor
