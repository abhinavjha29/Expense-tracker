import axios from "axios";
import React, { useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const EmailRef = useRef();
  const passwordRef = useRef();
  const Navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = EmailRef.current.value;
    const password = passwordRef.current.value;
    const loginDetail = { email, password };
    const resp = await axios.post(
      "http://localhost:5000/user/login",
      loginDetail
    );
    console.log("resp is", resp);

    if (resp.data.token) {
      localStorage.setItem("token", resp.data.token);
      return Navigate("/");
    } else {
      alert("Wrong Credentials");
    }
  };
  return (
    <div className="container mt-5 d-flex justify-content-center align-items-center">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Email:
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                ref={EmailRef}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password:
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                ref={passwordRef}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <NavLink to="/forgotPassword">
              <button type="button" className="btn btn-link">
                Forgot Password?
              </button>
            </NavLink>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
