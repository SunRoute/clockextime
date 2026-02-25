import jwt from "jsonwebtoken";
// Verificar si el token existe y es válido. Será en formato Bearer <token>
export const verifyToken = (req, res, next) => {
  // Verificar si existe el header authorization
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ message: "Token requerido" });
  }
  // Extraer token del header
  const token = authHeader.split(" ")[1];
  // Verificar token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token inválido" });
  }
};
