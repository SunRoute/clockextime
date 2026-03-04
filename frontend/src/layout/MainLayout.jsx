import { useState } from "react";
// Outlet es donde se renderizará el componente que se encuentra en la ruta hija
import { Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./MainLayout.css";

const MainLayout = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="layout">
      <header className="layout_header">
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
        <h1>Clockextime</h1>
        <div>
          <span>{user?.role}</span>
          <button onClick={logout}>Cerrar sesión</button>
        </div>
      </header>

      <aside className={`layout_sidebar ${menuOpen ? "active" : ""}`}>
        {user?.role === "admin" && (
          <>
            <p>Dashboard</p>
            <p>Usuarios</p>
            <p>Horas Extra</p>
          </>
        )}

        {user?.role === "employee" && (
          <>
            <p>Mi Jornada</p>
            <p>Mis Horas Extra</p>
          </>
        )}
      </aside>

      <main className="layout_content">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
