const express = require('express')
const router = express.Router()
const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require ('../Controllers/user.controller.js')

// GET /api/users — obtener todos los usuarios
router.get('/', getUsers)

// GET /api/users/:id — buscar un usuario por su ID personalizado
router.get('/:id', getUserById)

// POST /api/users — crear un nuevo usuario
router.post('/', createUser)

// PUT /api/users/:id — actualizar un usuario por su _id de MongoDB
router.put('/:id', updateUser)

// DELETE /api/users/:id — eliminar un usuario por su _id de MongoDB
router.delete('/:id', deleteUser)

module.exports = router;
