import { Route, Routes } from "react-router-dom";
import { SitioPublico } from "./paginas/SitioPublico";
import { AdminLogin } from "./paginas/AdminLogin";
import { AdminPanel } from "./paginas/AdminPanel";
import { RutaProtegida } from "./paginas/RutaProtegida";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SitioPublico />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <RutaProtegida>
            <AdminPanel />
          </RutaProtegida>
        }
      />
    </Routes>
  );
}

export default App;
