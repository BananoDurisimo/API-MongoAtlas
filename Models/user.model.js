const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    // ID personalizado (numérico), diferente al _id que genera MongoDB automáticamente
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true},
    email: {type: String, required : true, unique: true}
},{
    // Agrega automáticamente los campos createdAt y updatedAt
    timestamps: true
});

// El tercer argumento fuerza el nombre de la colección en MongoDB a 'Usuario'
module.exports = mongoose.model('User', userSchema, 'Usuario')
