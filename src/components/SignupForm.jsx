import axios from "axios";
import React, { useRef } from "react";
import { redirect, useNavigate } from "react-router-dom";

function SignUpForm() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const nameRef = useRef(null);
  const Navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const name = nameRef.current.value;

    // Here you can add your logic for form submission

    const user = {
      email,
      name,
      password,
    };
    const resp = await axios.post(
      "http://localhost:5000/user/postSignup",
      user
    );
    if (resp) {
      console.log(resp);
      return Navigate("/login");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <h1 className="h3 mb-3 fw-normal">Please sign up</h1>
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="floatingName"
                placeholder="Your Name"
                ref={nameRef}
                required
              />
              <label htmlFor="floatingName">Name</label>
            </div>
            <div className="form-floating">
              <input
                type="email"
                className="form-control"
                id="floatingEmail"
                placeholder="name@example.com"
                ref={emailRef}
                required
              />
              <label htmlFor="floatingEmail">Email address</label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                minLength="3"
                ref={passwordRef}
                required
              />
              <label htmlFor="floatingPassword">
                Password (min 3 characters)
              </label>
            </div>
            <button className="btn btn-primary py-2 mt-3" type="submit">
              Sign up
            </button>
          </form>
          <p className="mt-4 text-muted">© 2017–2024</p>
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;
