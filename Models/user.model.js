// ─── Modelo de Usuario ────────────────────────────────────────────────────────
// Un "modelo" define la estructura de los datos que se guardan en la base de datos.
// Es como una plantilla que dice: "cada usuario debe tener estos campos con estos tipos".

const mongoose = require('mongoose');

// Schema = esquema = la plantilla con los campos y sus reglas de validación
const userSchema = new mongoose.Schema({
    // ID personalizado que nosotros asignamos (número entero).
    // Es distinto al _id que MongoDB genera automáticamente para cada documento.
    id: {
        type: Number,      // Debe ser un número
        required: true,    // Es obligatorio — no se puede crear un usuario sin él
        unique: true       // No pueden existir dos usuarios con el mismo id
    },
    name: {
        type: String,      // Debe ser texto
        required: true     // Obligatorio
    },
    email: {
        type: String,      // Debe ser texto
        required: true,    // Obligatorio
        unique: true       // No pueden existir dos usuarios con el mismo email
    }
}, {
    // Con timestamps: true, MongoDB agrega automáticamente dos campos de fecha:
    // - createdAt: cuándo se creó el documento
    // - updatedAt: cuándo se modificó por última vez
    timestamps: true
});

// El tercer argumento ('Usuario') fuerza que los datos se guarden en la
// colección llamada 'Usuario' dentro de MongoDB (si no se pusiera, mongoose
// usaría 'users' por defecto)
module.exports = mongoose.model('User', userSchema, 'Usuario')
