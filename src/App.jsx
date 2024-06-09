import { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import PersistLogin from "./components/AuthComponents/PersistLogin/PersistLogin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Unauthorized from "./pages/Unauthorized/Unauthorized";
import RequireAuth from "./components/AuthComponents/RequireAuth/RequireAuth";
import CanteenDashboard from "./pages/CanteenDashboard/CanteenDashboard";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/login");
    }
  }, [location.pathname, navigate]);

  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={["CANTEEN_EMPLOYEE"]}/>} >
            <Route path="/canteen-dasboard" element={<CanteenDashboard/>} />
          </Route>
          <Route path="unauthorized" element={<Unauthorized />} />
        </Route>
        <Route path="*" element={<div>Oops! Page not found.</div>} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
