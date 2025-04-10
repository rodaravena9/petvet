# API Rest con Node.js y Express - Ejemplos vistos en clases

## Descripción

Este repositorio contiene un caso practico de una API Rest con Node.js y Express, en el cual se implementan los métodos HTTP GET, POST, PUT y DELETE.

## Ruta documentacion

http://localhost:3000/api/v1/api-docs

Prueba de Registro e Inicio de Sesión
Registro:
Endpoint: POST http://localhost:3000/api/v1/register
Body:
{
"email": "test@example.com",
"password": "password123",
"name": "Test User"
}

Inicio de Sesión:

Endpoint: POST http://localhost:3000/api/v1/login
Body:
{
"email": "test@example.com",
"password": "password123"
}

Se agregó validación a los datos del payload con joi
