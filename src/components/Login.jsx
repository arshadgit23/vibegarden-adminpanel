import React, { useEffect, useRef, useState } from "react";
import LoginLogo from "../assets/images/LoginLogo.png";
import apicall from "../assets/api/axios";
import { useDispatch } from "react-redux";
import { setUser } from "../store/reducers/userSlice";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "./ErrorMessage";
import Loader from "./Loader";

const Login = ({ setToken }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/home");
    } else {
      navigate("/");
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!emailRef.current.value) {
      setError("Enter Email");
      return;
    } else if (!passwordRef.current.value) {
      setError("Enter Password");
      return;
    } else if (passwordRef.current.value < 8) {
      setError("Password should be greater than 8 characters");
      return;
    } else if (!emailRef.current.value.match(emailRegex)) {
      setError("Email is not valid");
      return;
    }

    const loginData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      role: "admin",
    };

    try {
      setLoading(true);
      const response = await apicall.post("/users/admin-login", loginData);
      localStorage.setItem("token", response.data.token);
      dispatch(setUser(response.data.data.user));
      setLoading(false);
      setToken(response.data.token);
      setTimeout(() => {
        navigate("/home");
      }, 800);
    } catch (e) {
      setError(e?.response?.data?.message);
      setLoading(false);
    }
  };

  return (
    <div className=" absolute z-50 top-0 left-0 bg-login bg-no-repeat bg-cover bg-center h-screen w-full flex items-center p-5">
      <div className="  w-80 mx-auto">
        <div className="  flex flex-col items-center justify-center">
          <img src={LoginLogo} />
          <h1 className=" text-[#1b5b2f] text-5xl font-thin my-3">Login</h1>
        </div>
        <form onSubmit={handleLogin}>
          <label
            htmlFor="email"
            className=" block capitalize my-2 text-[#1b5b2f]"
          >
            Email Address
          </label>
          <input
            type="text"
            name="email"
            id="email"
            className=" w-full shadow-lg rounded-md px-4 py-3 border border-[#1b5b2f] outline-none "
            ref={emailRef}
          />
          <label
            htmlFor="password"
            className=" block capitalize my-2 text-[#1b5b2f]"
          >
            password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className=" w-full shadow-lg rounded-md px-4 py-3 border border-[#1b5b2f] outline-none "
            ref={passwordRef}
          />
          <div className=" flex justify-center">
            <button className=" bg-pink my-8 px-12 py-2 rounded-md hover:bg-yellow">
              {loading ? <Loader /> : "Login"}
            </button>
          </div>
        </form>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </div>
    </div>
  );
};

export default Login;
