import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { loginRequest } from "../../api/authApi";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  // Obtener datos del formulario
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
      const response = await loginRequest(formData);

      if (!response.ok) {
        // Si se requiere cambiar la contraseña
        if (response.data.requirePasswordChange) {
          navigate("/change-password", {
            state: {
              fromLogin: true,
              email: formData.email,
            },
          });
          return;
        }
        // Si no se ha logueado correctamente
        alert(response.data.message || "Error en login");
        return;
      }

      // Si se ha logueado correctamente
      login(response.data.token);
      navigate("/dashboard");
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
            type="email"
            name="email"
            placeholder="email@ejemplo.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Button type="submit">Entrar</Button>
        </form>
      </Card>
    </div>
  );
};

export default Login;
