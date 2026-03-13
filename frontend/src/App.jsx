import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import PrivateRoute from "./routes/PrivateRoute";
import RoleRoute from "./routes/RoleRoute";

import MainLayout from "./layout/MainLayout";

// Páginas públicas
import Login from "./pages/auth/Login";
import ChangePassword from "./pages/auth/ChangePassword";

// Páginas comunes
import Dashboard from "./pages/employee/Dashboard";
import MyWorkday from "./pages/employee/MyWorkday";

// Páginas de administrador
import AdminPanel from "./pages/admin/AdminPanel";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/change-password" element={<ChangePassword />} />

        {/* Rutas protegidas con un componente principal */}
        <Route element={<PrivateRoute />}>
          <Route element={<MainLayout />}>
            {/* Rutas comunes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/my-workday" element={<MyWorkday />} />
            {/* Rutas de administrador */}
            <Route element={<RoleRoute allowedRole="admin" />}>
              <Route path="/admin" element={<AdminPanel />} />
            </Route>
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
