const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: "No se proporcionó el token" });
  }

  try {
    const path = require('path');
    const fs = require('fs');

    const publicKeyPath = path.resolve(process.cwd(), process.env.KEYCLOAK_PUBLIC_KEY_PATH);
    const publicKey = fs.readFileSync(publicKeyPath, 'utf8');

    const publicKey2 = crypto.createPublicKey(publicKey);

    const decoded = jwt.verify(token, publicKey2, { algorithms: ['RS256'] });
    console.log('Token decodificado:', decoded);

    if (!decoded.realm_access.roles.includes('admin')) {
      return res.status(403).json({ message: "Acceso denegado - Rol insuficiente" });
    }

    req.user = decoded;
    next();
  } catch (err) {
    console.error("Error al verificar el token:", err);
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
};

module.exports = validateToken;
