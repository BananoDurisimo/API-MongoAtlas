const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./Config/db.js')
const useRoutes = require('./Routes/user.routes')


dotenv.config() 
connectDB();


const app = express()

app.use(cors())
app.use(express.json())


app.use('/api/users', useRoutes);


const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Servidor Corriendo en el puerto ${PORT}`)) 