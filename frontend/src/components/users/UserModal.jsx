import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";

const UserModal = ({ user, onClose, onSave, onResetPassword }) => {
  const [form, setForm] = useState(user);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleResetPassword = () => {
    onResetPassword();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          x
        </button>
        <h3>Editar usuario</h3>

        <Input
          name="employee_name"
          value={form.employee_name}
          onChange={handleChange}
          placeholder="Nombre"
        />
        <Input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <Input
          name="employee_number"
          value={form.employee_number}
          onChange={handleChange}
          placeholder="Nº empleado"
        />

        <select name="role_id" value={form.role_id} onChange={handleChange}>
          <option value={1}>Admin</option>
          <option value={2}>Empleado</option>
        </select>

        <label className="label">Horas diarias de trabajo:</label>
        <Input
          name="daily_working_hours"
          value={form.daily_working_hours || ""}
          onChange={handleChange}
          placeholder="Ej: 8"
        />

        <label className="label">Horas semanales de trabajo:</label>
        <Input
          name="weekly_working_hours"
          value={form.weekly_working_hours || ""}
          onChange={handleChange}
          placeholder="Ej: 40"
        />

        <div style={{ display: "flex", gap: "0.5rem" }}>
          <Button onClick={() => handleResetPassword()}>
            Resetear contraseña
          </Button>

          <Button onClick={() => onSave(form)}>Enviar cambios</Button>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
