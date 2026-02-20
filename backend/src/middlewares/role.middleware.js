// Verificar si el usuario logueado tiene el rol de admin
export const verifyAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Acceso solo para administradores." });
  }
  next();
};
