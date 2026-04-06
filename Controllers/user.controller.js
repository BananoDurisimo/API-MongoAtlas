// ─── Controladores de usuarios ────────────────────────────────────────────────
// Los controladores contienen la lógica de cada operación.
// Reciben la petición (req), hacen algo con la base de datos y devuelven una respuesta (res).

const User = require('../Models/user.model')

// ── Obtener todos los usuarios ────────────────────────────────────────────────
// Responde con un array JSON que contiene todos los usuarios de la colección
const getUsers = async (req, res) => {
    try {
        // User.find() sin argumentos trae todos los documentos de la colección
        const users = await User.find();
        res.json(users);
    } catch (error) {
        // Si algo falla (ej. base de datos caída), respondemos con código 500 (error del servidor)
        res.status(500).json({ message: error.message })
    }
};

// ── Obtener un usuario por su ID personalizado ────────────────────────────────
// Busca por el campo 'id' numérico que nosotros definimos, NO por el _id de MongoDB
const getUserById = async (req, res) => {
    // req.params contiene los valores de la URL; ej. /api/users/3 → id = "3"
    const { id } = req.params;
    try {
        // Los parámetros de URL llegan como texto (string), pero nuestro campo id
        // es de tipo Number en el schema, así que hay que convertirlo
        const user = await User.findOne({ id: Number(id) });

        // Si no existe ningún usuario con ese id, respondemos con 404 (no encontrado)
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ── Crear uno o varios usuarios ───────────────────────────────────────────────
// Acepta tanto un objeto único como un array de usuarios en el body de la petición
const createUser = async (req, res) => {
    try {
        // Comprobamos si el body es un array para saber si vienen varios usuarios a la vez
        if (Array.isArray(req.body)) {
            // insertMany guarda todos los documentos de una sola vez (más eficiente que
            // guardarlos uno por uno en un bucle) y aplica las validaciones del schema a cada uno
            const users = await User.insertMany(req.body);
            return res.status(201).json(users); // 201 = "creado correctamente"
        }

        // Si solo viene un usuario, lo creamos individualmente
        const { id, name, email } = req.body;
        const newUser = new User({ id, name, email });
        await newUser.save(); // Guarda el documento en MongoDB
        res.status(201).json(newUser);
    } catch (error) {
        // Código 400 = "petición incorrecta" (ej. falta un campo obligatorio, email duplicado)
        res.status(400).json({ message: error.message })
    }
}

// ── Actualizar un usuario ─────────────────────────────────────────────────────
// Modifica el name y/o email de un usuario existente. Se identifica por su _id de MongoDB.
const updateUser = async (req, res) => {
    // El id que llega por la URL aquí es el _id de MongoDB (no el id numérico nuestro)
    const { id } = req.params;
    const { name, email } = req.body; // Los nuevos valores que queremos guardar
    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,             // Busca el documento con este _id
            { name, email },// Lo actualiza con estos nuevos valores
            { new: true }   // Sin esta opción, mongoose devolvería los datos ANTES del cambio;
                            // con { new: true } devuelve los datos YA actualizados
        )

        if (!updatedUser) {
            return res.status(404).json({ message: 'Usuario no encontrado' })
        }
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// ── Eliminar un usuario ───────────────────────────────────────────────────────
// Borra permanentemente un usuario de la base de datos. Se identifica por su _id de MongoDB.
const deleteUser = async (req, res) => {
    const { id } = req.params
    try {
        // findByIdAndDelete busca el documento por su _id y lo elimina en una sola operación
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: 'Usuario no encontrado' })
        }
        res.json({ message: 'Usuario eliminado correctamente' })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
