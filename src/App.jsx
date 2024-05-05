import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import Login from "./components/Login";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(()=>{
    if(location.pathname === "/") {
      navigate('/login')
    }
  }, [])

  return (
    <div>
      <Routes>
        <Route path="/">
          <Route index path="login" element={<Login/>}/>
          <Route path="dashboard" element={<Dashboard/>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
