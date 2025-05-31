/*
Description: Middleware to validate JWT tokens from Keycloak
Author: Carlos
Date: 2025-04-23
Usage: This middleware should be used in your Express routes to protect them from unauthorized access.
Example: app.use('/x_route', validateToken, protectedRouteController), this protection is applied 
in the .routes.js file of the required route. In this example: bakend/src/routes/x_route.routes.js.

Dependencies: jsonwebtoken, fs, path, crypto

Notes: 
  - Ensure that the environment variable KEYCLOAK_PUBLIC_KEY_PATH is set to the path of your Keycloak public key file,
    this public key should be in PEM format and should be accessible to the application.
  - This middleware assumes that the JWT token is passed in the Authorization header as a Bearer token, used to check
    if the user has the 'admin' role in the realm_access roles array. Adjust as necessary.
  - The middleware logs the decoded token for debugging purposes. Remove or comment out in production.
  - RS256 algorithm is used for token verification. Ensure that your Keycloak server is configured to use this algorithm.

 Librarys: jsonwebtoken, fs, path, crypto
  - jsonwebtoken: A library to work with JSON Web Tokens (JWT). It allows you to verify and decode JWTs easily. 
    Ensure that it is installed in your project.
  - fs: A built-in Node.js library to work with the file system. It is used to read the public key file. 
    Ensure that it is available in your environment.
  - path: A built-in Node.js library to work with file and directory paths. It is used to resolve the path to the public key file. 
    Ensure that it is available in your environment.
  - crypto: A built-in Node.js library to perform cryptographic operations. It is used to create a public key object from the PEM formatted public key. 
    Ensure that it is available in your environment.
*/
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
// Middleware function to validate JWT tokens
const uuid = "";
const username = "";

const validateToken = (req, res, next) => {
  /*
  // Check if the request has an Authorization header
  // The token is expected to be in the format "Bearer <token>"
  // Split the header value to extract the token: const token = req.headers['authorization'].split(' ')[1];
  */
  const token = req.headers['authorization']?.split(' ')[1];
  // If the token is not present, return a 403 Forbidden response
  if (!token) {
    return res.status(403).json({ message: "No se proporcionó el token" });
  }
  // If the token is present, proceed to verify it
  try {
    const path = require('path');
    const fs = require('fs');
    // Read the public key from the file system
    // Takes the path from the environment variable KEYCLOAK_PUBLIC_KEY_PATH
    const publicKeyPath = path.resolve(process.cwd(), process.env.KEYCLOAK_PUBLIC_KEY_PATH);
    // Tries to read the public key file using the path resolved above
    const publicKey = fs.readFileSync(publicKeyPath, 'utf8');

    // Create a public key object from the PEM formatted public key, necessary for verification
    const publicKey2 = crypto.createPublicKey(publicKey);
    /*
    Verify the token using the public key and the RS256 algorithm, the jwt token is divided into 3 parts separated by '.',
    the first part is the header, the second part is the payload and the third part is the signature
    The header contains the algorithm used to sign the token, the payload contains the claims (user information) 
    and the signature is used to verify the authenticity of the token. For more info: https://jwt.io/introduction
    */
    const decoded = jwt.verify(token, publicKey2, { algorithms: ['RS256'] });
    // Log the decoded token for debugging purposes, also you can use https://jwt.io/ to decode the token.
    //console.log('Token decodificado:', decoded);
    /*
    The decoded token contains the user information and the roles assigned to the user in the Keycloak realm so
    we can check if the user has the required role in the realm_access roles array (in this case 'admin).
    The realm_access.roles array contains the roles assigned to the user in the Keycloak realm
    */
    if (!decoded.realm_access.roles.includes('admin')) {
      // If the user does not have the required role, return a 403 Forbidden response
      return res.status(403).json({ message: "Acceso denegado - Rol insuficiente" });
    }
    /*
    If the user has the required role, attach the decoded token to the request object and call the next middleware
    This allows us to access the user information in the next middleware or route handler
    For example, req.user will contain the user information and we can use it to check if the user is authorized to access the end point
    or to get the user information to use it in the application (for example, to get the user id or email)
    */
    req.user = {
      sub: decoded.sub,     // UUID del usuario
      name: decoded.name,   // Nombre de usuario legible
    };
    next();

  } catch (err) {
    // The jwt.verify method will throw an error if the token is invalid or expired
    // logged for debugging purposes
    console.error("Error al verificar el token:", err);
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
};
// Export the middleware function to use it in other files
module.exports = validateToken;
