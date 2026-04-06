import { useEffect, useState } from "react";
import {
  getUsersRequest,
  createUserRequest,
  toggleUserRequest,
  updateUserRequest,
  resetPasswordRequest,
} from "../../api/usersApi";
import UserCard from "../../components/users/UserCard";
import UserModal from "../../components/users/UserModal";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import "../../styles/users.css";

const UsersPage = () => {
  const [tab, setTab] = useState("gestion");
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const [form, setForm] = useState({
    employee_number: "",
    employee_name: "",
    email: "",
    password: "",
    role_id: 2,
    daily_working_hours: "",
    weekly_working_hours: "",
  });

  const fetchUsers = async () => {
    const res = await getUsersRequest();
    if (res.ok) setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filtrar usuarios
  const filteredUsers = users.filter(
    (user) =>
      user.employee_name.toLowerCase().includes(search.toLowerCase()) ||
      user.employee_number.includes(search),
  );

  // Crear usuario
  const handleCreate = async (e) => {
    e.preventDefault();
    const res = await createUserRequest(form);
    if (res.ok) {
      alert("Usuario creado");
      fetchUsers();
    }
  };

  // Activar o desactivar usuario
  const handleToggle = async (user) => {
    if (user.role_id === 1 && user.active) {
      alert("No se puede desactivar al administrador");
      return;
    }

    const confirm = window.confirm(
      `¿Seguro que quieres ${user.active ? "desactivar" : "activar"} este usuario?`,
    );

    if (!confirm) return;

    await toggleUserRequest(user.id);
    fetchUsers();
  };

  // Actualizar usuario
  const handleUpdate = async (updatedUser) => {
    const res = await updateUserRequest(selectedUser.id, updatedUser);
    if (res.ok) {
      alert("Usuario actualizado");
      fetchUsers();
      setSelectedUser(null);
    }
  };

  // Resetear contraseña
  const handleResetPassword = async () => {
    const confirm = window.confirm(
      "¿Seguro que quieres resetear la contraseña de este usuario?",
    );
    if (!confirm) return;

    const res = await resetPasswordRequest(selectedUser.id);
    if (res.ok) {
      alert("Contraseña reseteada a 1234");
    } else {
      alert("Error al resetear contraseña");
    }
  };

  return (
    <div>
      {/* TABS */}
      <div className="tabs">
        <button
          className={tab === "gestion" ? "active" : ""}
          onClick={() => setTab("gestion")}
        >
          Gestión usuario
        </button>
        <button
          className={tab === "crear" ? "active" : ""}
          onClick={() => setTab("crear")}
        >
          Crear usuario
        </button>
      </div>

      {/* GESTIÓN */}
      {tab === "gestion" && (
        <>
          <Input
            placeholder="Buscar por email o nº empleado"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="users-grid">
            {filteredUsers.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                onEdit={setSelectedUser}
                onToggle={handleToggle}
              />
            ))}
          </div>
        </>
      )}

      {/* CREAR */}
      {tab === "crear" && (
        <form onSubmit={handleCreate} className="form">
          <Input
            placeholder="Nº empleado"
            name="employee_number"
            onChange={(e) =>
              setForm({ ...form, employee_number: e.target.value })
            }
          />
          <Input
            placeholder="Nombre"
            name="employee_name"
            onChange={(e) =>
              setForm({ ...form, employee_name: e.target.value })
            }
          />
          <Input
            placeholder="Email"
            name="email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <Input
            placeholder="Contraseña"
            name="password"
            type="password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <select
            name="role_id"
            onChange={(e) => setForm({ ...form, role_id: e.target.value })}
          >
            <option value={2}>Empleado</option>
            <option value={1}>Administrador</option>
          </select>

          <Input
            placeholder="Horas diarias"
            onChange={(e) =>
              setForm({ ...form, daily_working_hours: e.target.value })
            }
          />
          <Input
            placeholder="Horas semanales"
            onChange={(e) =>
              setForm({ ...form, weekly_working_hours: e.target.value })
            }
          />

          <Button type="submit">Crear usuario</Button>
        </form>
      )}

      {/* MODAL */}
      {selectedUser && (
        <UserModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onSave={handleUpdate}
          onResetPassword={handleResetPassword}
        />
      )}
    </div>
  );
};

export default UsersPage;
