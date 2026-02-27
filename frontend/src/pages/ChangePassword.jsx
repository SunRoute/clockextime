import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const navigate = useNavigate();

  // Obtener datos del formulario
  const [formData, setFormData] = useState({
    email: "",
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
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/first-change-password`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      const data = await response.json();

      // Si se ha cambiado la contraseña correctamente
      if (response.ok) {
        alert("Contraseña cambiada. Inicie sesión nuevamente.");
        navigate("/login");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión");
    }
  };

  return (
    <div>
      <h2>Cambiar contraseña</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="currentPassword"
          placeholder="Contraseña actual"
          value={formData.currentPassword}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="newPassword"
          placeholder="Nueva contraseña"
          value={formData.newPassword}
          onChange={handleChange}
          required
        />
        <button type="submit">Actualizar</button>
      </form>
    </div>
  );
};

export default ChangePassword;
