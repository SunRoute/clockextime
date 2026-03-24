import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import GuestRoute from "./routes/GuestRoute";
import PrivateRoute from "./routes/PrivateRoute";
import RoleRoute from "./routes/RoleRoute";

import MainLayout from "./layout/MainLayout";

// Páginas públicas
import Login from "./pages/auth/Login";
import ChangePassword from "./pages/auth/ChangePassword";

// Páginas comunes
import Dashboard from "./pages/employee/Dashboard";
import MyWorkday from "./pages/employee/MyWorkday";
import MyOvertimes from "./pages/employee/MyOvertimes";

// Páginas de administrador
import AdminPanel from "./pages/admin/AdminPanel";
import Users from "./pages/admin/Users";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta de inicio */}
        <Route
          path="/login"
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />
        {/* Rutas públicas */}
        <Route path="/change-password" element={<ChangePassword />} />
        {/* Rutas protegidas con un componente principal */}
        <Route element={<PrivateRoute />}>
          <Route element={<MainLayout />}>
            {/* Rutas comunes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/my-workday" element={<MyWorkday />} />
            <Route path="/my-overtimes" element={<MyOvertimes />} />
            {/* Rutas de administrador */}
            <Route element={<RoleRoute allowedRole="admin" />}>
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/users" element={<Users />} />
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
