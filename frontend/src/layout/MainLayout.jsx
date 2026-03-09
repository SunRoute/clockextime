import { useState } from "react";
// Outlet es donde se renderizará el componente que se encuentra en la ruta hija
import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./MainLayout.css";

const MainLayout = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const toggleAdminMenu = () => {
    setAdminOpen(!adminOpen);
  };

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
        <nav>
          <NavLink to="/dashboard">Dashboard</NavLink>

          <NavLink to="/my-workday">Mi jornada</NavLink>

          <NavLink to="/my-overtimes">Mis horas extra</NavLink>

          {user?.role === "admin" && (
            <>
              <button className="sidebar-section" onClick={toggleAdminMenu}>
                Administración
              </button>

              {adminOpen && (
                <div className="submenu">
                  <NavLink to="/admin">Panel admin</NavLink>

                  <NavLink to="/users">Usuarios</NavLink>

                  <NavLink to="/overtime-management">Horas extra</NavLink>
                </div>
              )}
            </>
          )}
        </nav>
      </aside>

      <main className="layout_content">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
