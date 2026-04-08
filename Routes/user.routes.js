// ─── Rutas de usuarios ────────────────────────────────────────────────────────
// Las rutas definen qué URL acepta el servidor y qué función ejecuta en cada caso.
// Es como un menú: "si alguien pide X, llama a la función Y".

const express = require('express')

// Router es un mini-servidor que agrupa rutas relacionadas (en este caso, las de usuarios)
const router = express.Router()

// Importamos las funciones que contienen la lógica de cada operación
const {
    getUsers,       // Obtener todos los usuarios
    getUserById,    // Obtener un usuario por su ID
    createUser,     // Crear uno o varios usuarios nuevos
    updateUser,     // Modificar los datos de un usuario
    deleteUser      // Eliminar un usuario
} = require('../Controllers/user.controller.js')

// GET  /api/users
// Devuelve la lista completa de usuarios guardados en la base de datos
router.get('/', getUsers)

// GET  /api/users/:id
// Devuelve un único usuario buscando por su id personalizado (número)
// Ejemplo: GET /api/users/3  →  busca el usuario con id = 3
router.get('/:id', getUserById)

// POST  /api/users
// Crea uno o varios usuarios nuevos. El cuerpo de la petición debe traer los datos en JSON.
// Ejemplo de body: { "id": 1, "name": "Ana", "email": "ana@email.com" }
router.post('/', createUser)

// PUT  /api/users/:id
// Actualiza los datos (name, email) de un usuario existente, identificado por su id numérico
// Ejemplo: PUT /api/users/3  →  actualiza el usuario con id = 3
router.put('/:id', updateUser)

// DELETE  /api/users/:id
// Elimina permanentemente un usuario identificado por su id numérico
// Ejemplo: DELETE /api/users/3  →  elimina el usuario con id = 3
router.delete('/:id', deleteUser)

module.exports = router;
