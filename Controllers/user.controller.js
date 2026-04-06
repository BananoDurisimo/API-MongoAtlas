const User = require('../Models/user.model')

// GET /api/users — devuelve todos los usuarios de la colección
const getUsers = async (req, res) =>{
    try{
        const users = await User.find();
        res.json(users);
    }catch (error){
        res.status(500).json({ message: error.message})
    }
};

// GET /api/users/:id — busca por el campo 'id' personalizado (no por _id de MongoDB)
const getUserById = async (req, res) => {
    const { id } = req.params;
    try{
        // Convierte a Number porque el campo id está definido como tipo Number en el schema
        const user = await User.findOne({ id: Number(id) });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST /api/users — acepta un objeto o un array de usuarios
const createUser = async (req, res) => {
    try {
        if (Array.isArray(req.body)) {
            // insertMany inserta todos a la vez y respeta las validaciones del schema
            const users = await User.insertMany(req.body);
            return res.status(201).json(users);
        }
        const { id, name, email } = req.body;
        const newUser = new User({ id, name, email });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error){
        res.status(400).json({message: error.message })
    }
}

// PUT /api/users/:id — actualiza name y email de un usuario por su _id de MongoDB
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
        // { new: true } retorna el documento ya actualizado en lugar del anterior
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { name, email},
            { new: true }
        )
        if (!updatedUser){
            return res.status(404).json({ message: 'Usuario no encontrado'})
        }
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message})
    }
}

// DELETE /api/users/:id — elimina un usuario por su _id de MongoDB
const deleteUser = async ( req, res) => {
    const { id } = req.params
    try {
        const deleteUser = await User.findByIdAndDelete(id);
        if(!deleteUser){
            return res.status(404).json({ message: 'Usuario no encontrado '})
        }
        res.json ({message: 'Usuario eliminado correctamente '})
    } catch (error){
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
