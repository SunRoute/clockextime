import { useState } from "react";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { firstChangePasswordRequest } from "../../api/authApi";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

const ChangePassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Comprobar si se ha iniciado desde el login
  const fromLogin = location.state?.fromLogin;

  // Proteger acceso directo: solo se permite si viene de Login
  if (!fromLogin) {
    return <Navigate to="/login" replace />;
  }

  // Obtener datos del formulario
  const [formData, setFormData] = useState({
    email: location.state?.email || "",
    currentPassword: "",
    newPassword: "",
  });

  // Actualizar datos del formulario
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Enviar datos al servidor
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await firstChangePasswordRequest(formData);

      // Si se ha cambiado la contraseña correctamente
      if (response.ok) {
        alert("Contraseña cambiada. Inicie sesión nuevamente.");
        navigate("/login", { replace: true });
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión");
    }
  };

  return (
    <div className="form-container">
      <Card>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            type="password"
            name="currentPassword"
            placeholder="Contraseña actual"
            value={formData.currentPassword}
            onChange={handleChange}
            required
          />
          <Input
            type="password"
            name="newPassword"
            placeholder="Nueva contraseña"
            value={formData.newPassword}
            onChange={handleChange}
            required
          />
          <Button type="submit">Actualizar</Button>
        </form>
      </Card>
    </div>
  );
};

export default ChangePassword;
