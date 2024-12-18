import { Login } from "./pages/login/Login";
import { BrowserRouter as Router, Route, Routes,Navigate } from "react-router-dom";
import { Protectedroute } from "./pages/Protectedroutes/protectedroute";
import { Dashboard } from "./pages/dashboard/Dashboard";
import { useNavigate } from "react-router-dom";
function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
