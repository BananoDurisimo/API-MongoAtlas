const authMiddleware =  (req, res, next) => {
    // Lee el token del header Authorization de la petición
    const token = req.headers.authorization;
    // Si el token no coincide, bloquea la petición con 401 (no autorizado)
    if (token !== 'mi_token_secreto'){
        return res.status(401).json({ message: 'No autorizado'})
    }
    // Token válido — pasa al siguiente middleware o controlador
    next();
};

module.exports = authMiddleware;
