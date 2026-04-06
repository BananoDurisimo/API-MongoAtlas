const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./Config/db.js')
const useRoutes = require('./Routes/user.routes')

// Carga las variables de entorno desde el archivo .env (PORT, MONGO_URI, etc.)
dotenv.config()
// Conecta a MongoDB antes de levantar el servidor
connectDB();


const app = express()

// Permite peticiones desde otros orígenes (Cross-Origin Resource Sharing)
app.use(cors())
// Parsea el body de las peticiones como JSON
app.use(express.json())

// Todas las rutas de usuarios se prefijan con /api/users
app.use('/api/users', useRoutes);


const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Servidor Corriendo en el puerto ${PORT}`))
