const mongoose = require('mongoose')

const connectDB = async () =>{
    try{
        // MONGO_URI viene del .env — contiene la cadena de conexión a MongoDB Atlas o local
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Mongo conectado")
    } catch (error){
        console.log("❌ Error conectando a mongoDB", error);
        // Si falla la conexión, termina el proceso para evitar que la app corra sin BD
        process.exit(1)
    }
}

module.exports = connectDB
