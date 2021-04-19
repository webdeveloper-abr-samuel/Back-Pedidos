const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {  
  let token = req.headers["x-access-token"] || req.headers["authorization"] || req.cookies.authorization;
  if (!token) return next(res.status(401).json({msg : 'Acceso no Autorizado'}));
  
  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }
  
  jwt.verify(token, process.env.SECRETKEY, (err, decoded) => {
    if (err)
      return next(
        res.status(401).json({msg : 'ha ocurrido un error al validar la sesion'})
      );
    req.asesor = decoded.asesor
    req.distribuidor = decoded.distribuidor
    req.profile = decoded.profile
    next();
  });
};

module.exports = {
  verifyToken
};
