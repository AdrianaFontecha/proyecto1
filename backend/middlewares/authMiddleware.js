const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(403).json({
            success: false,
            message: 'No se proporcionó un token'
        });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(403).json({
            success: false,
            message: 'Formato de token inválido'
        });
    }

    jwt.verify(token, keys.secretOrKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                success: false,
                message: 'Token inválido o expirado',
                error: err
            });
        }
        req.user = decoded;
        next();
    });
}

function authorizeRoles(roles) {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: `Acceso denegado: se requiere rol ${roles.join(' o ')}`
            });
        }
        next();
    };
}

module.exports = {
    verifyToken,
    authorizeRoles
};