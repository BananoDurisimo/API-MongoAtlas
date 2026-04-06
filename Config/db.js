// ─── Conexión a la base de datos ─────────────────────────────────────────────
// Este archivo se encarga únicamente de conectar la aplicación con MongoDB.
// MongoDB es la base de datos donde se guardarán todos los usuarios.

const mongoose = require('mongoose')

// mongoose es la librería que nos permite hablar con MongoDB desde Node.js
// de una forma más sencilla que usando MongoDB directamente

const connectDB = async () => {
    try {
        // MONGO_URI es la "dirección" de la base de datos (viene del archivo .env)
        // Puede apuntar a una base de datos en la nube (MongoDB Atlas) o a una local
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Mongo conectado")
    } catch (error) {
        // Si la conexión falla (ej. dirección incorrecta, sin internet, credenciales malas)
        // mostramos el error y detenemos la app — no tiene sentido correr sin base de datos
        console.log("❌ Error conectando a mongoDB", error);
        process.exit(1) // Código 1 significa que el proceso terminó con error
    }
}

module.exports = connectDB
