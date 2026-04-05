const express = require('express')
const router = express.Router()
const {
    getUsers,
    createUser,
    updateUser,
    deleteUser
} = require ('../Controllers/user.controller.js')

// obtener todos los usuarios 
router.get('/', createUser)

// Crear un nuevo usuario
router.post('/', createUser)

//Actualizar un usuario por ID
router.put('/', updateUser)

// Eliminar un usuario por ID
router.delete('/', deleteUser)

module.exports = router;