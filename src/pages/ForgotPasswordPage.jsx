import React, { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const emailRef = useRef(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const email = emailRef.current.value;
      // Send email to API for updating
      const response = await axios.post(
        "http://localhost:5000/verify/forgot-Password",
        {
          email: email,
        }
      );

      setMessage(response.data.message);
    } catch (error) {
      console.error("Error updating password:", error.message);
      setMessage("Error updating password. Please try again.");
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <h2 className="card-title mb-4">Forgot Password</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                ref={emailRef}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
          {message && <p className="mt-3">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
