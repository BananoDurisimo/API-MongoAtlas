const user = require('../models/user.model')

// obtener todos los usuarios (Read)
const getUsers = async (req, res) =>{
    try{
        const users = await user.find();
        res.json(users);

    }catch (error){
        res.status(500).json({ message: error.message})
    }
};


// Crear un usuario (Create)
const createUser = async (req, res) => {
    const {name, email } = req.body;
    try {
        const newUser = new User({ name, email})
        await newUser.save()
        res.status(201).json(newUser);
    } catch (erorr){
        res.status(400).json({message: error.message })
    }
}


// Actualizar un usaurio existente (Update)
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;


    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { name, email},
            { new: true }
        )
        if (!updateUser){
            return res.status(404).json({ message: 'Usuario no encontrado'})
        }
        res.json(updateUser);
    } catch (error) {
        res.status(400).json({ message: error.message})
    }
}

// eliminar un usuario (Delete)
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
    createUser,
    updateUser,
    deleteUser
};