// ─── Punto de entrada de la aplicación ───────────────────────────────────────
// Este es el archivo principal. Aquí se "arma" el servidor y se pone en marcha.

// Express es el framework que nos permite crear el servidor web fácilmente
const express = require('express')

// CORS permite que otras páginas web (ej. un frontend en otro dominio) puedan
// hacer peticiones a nuestra API sin que el navegador las bloquee
const cors = require('cors')

// dotenv lee el archivo .env y convierte sus líneas en variables accesibles
// con process.env (ej. process.env.PORT). Así guardamos datos sensibles fuera del código
const dotenv = require('dotenv')

// Función que abre la conexión con la base de datos MongoDB
const connectDB = require('./Config/db.js')

// Todas las rutas relacionadas con usuarios (/api/users/...)
const useRoutes = require('./Routes/user.routes')

// Carga las variables del archivo .env antes de usarlas
dotenv.config()

// Conecta a la base de datos. Si falla, la app se detiene (ver Config/db.js)
connectDB();

// Crea la aplicación Express (el "motor" del servidor)
const app = express()

// Activa CORS para aceptar peticiones desde cualquier origen
app.use(cors())

// Le dice al servidor que espere y entienda datos en formato JSON
// (el formato estándar para enviar y recibir información en APIs modernas)
app.use(express.json())

// Registra las rutas de usuarios bajo el prefijo /api/users
// Ejemplo: GET /api/users  →  obtiene todos los usuarios
app.use('/api/users', useRoutes);

// Lee el puerto desde el .env; si no está definido, usa el 5000 por defecto
const PORT = process.env.PORT || 5000

// Arranca el servidor y muestra un mensaje cuando esté listo para recibir peticiones
app.listen(PORT, () => console.log(`Servidor Corriendo en el puerto ${PORT}`))
