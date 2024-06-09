import React, { useEffect, useState } from "react";
import "./Login.css";
import Logo from "../../assets/Group.png";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useToggle from "../../hooks/useToggle";
import useInput from "../../hooks/useInput";
import axios from "../../services/api";
import { toast } from "react-toastify";
import Loading from "../../components/CommonComponents/Loading/Loading";
import { jwtDecode } from "jwt-decode";

const LOGIN_URL = "/api/v1/auth/authenticate";

const Login = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const [user, resetUser, userAttribs] = useInput("user", "");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [check, toggleCheck] = useToggle("persist", false);
  const from = location.state?.from?.pathname || "/dashboard";
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        LOGIN_URL,
        {
          email: user,
          password: pwd,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setTimeout(() => {
        const accessToken = response?.data?.access_token;
        const decoded = accessToken ? jwtDecode(accessToken) : undefined
        const roles = decoded?.roles || [] ;
        setAuth({ user, accessToken });
        resetUser();
        setPwd("");
        setIsLoading(false);
        navigate(roles[0].authority === "ADMIN" ? '/dashboard' : "/canteen-dasboard", { replace: true });
      }, 2000);

    } catch (err) {
      setErrMsg(`${err}"username or password wrong"`);
      resetUser();
      setPwd("");
      toast.error("Username or Password is wrong");
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      {isLoading ? (
        <Loading />
      ) : (
        <form onSubmit={handleLogin} className="login-form">
          <div className="logo-container">
            <img src={Logo} className="logo" />
            <p>logo</p>
          </div>
          <div className="greeting-container">
            <h1>Welcome!</h1>
            <h2>Hello, welcome back </h2>
            <p>
              Enter the information you entered during registration, this helps
              us remember you.
            </p>
          </div>
          <div className="input-area">
            <label>Email Adress</label>
            <input
              type="email"
              className=""
              placeholder="Username"
              {...userAttribs}
              required
            />
          </div>
          <div style={{ marginTop: "10px" }} className="input-area">
            <label>Password</label>
            <input
              className=""
              type="password"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              required
              placeholder="Password"
            />
          </div>
          <div className="form-checkbox">
            <input
              type="checkbox"
              className="w-4 h-4 accent-blue-500 focus:border-none focus:outline-none"
              onChange={toggleCheck}
              id="persist"
              checked={check}
            />
            <span className="text-second text-sm ">Remember me</span>
          </div>
          <div className="btn-container">
            <button type="submit" className="login-btn">
              login
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Login;
