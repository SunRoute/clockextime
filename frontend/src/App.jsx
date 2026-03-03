import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import RoleRoute from "./routes/RoleRoute";

import Login from "./pages/Login";
import ChangePassword from "./pages/ChangePassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/change-password" element={<ChangePassword />} />

        {/* Rutas protegidas */}
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <RoleRoute allowedRole="admin">
                <h1>Panel Admin</h1>
                {/* <AdminPanel /> */}
              </RoleRoute>
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <h1>Dashboard (placeholder)</h1>
            </PrivateRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
