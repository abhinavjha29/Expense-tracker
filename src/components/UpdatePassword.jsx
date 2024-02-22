import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UpdatePassword = () => {
  const { resetToken } = useParams();
  const newPasswordRef = useRef(null);
  const errorRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPassword = newPasswordRef.current.value;
    try {
      const response = await axios.post(
        `http://localhost:5000/verify/reset-password/${resetToken}`,
        { newPassword }
      );
      console.log(response.data.message); // Assuming the response contains a success message
      // Redirect the user to a success page or login page
    } catch (error) {
      errorRef.current.innerText = error.response.data.message; // Assuming the error response contains a message
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center align-items-center">
      <div className="card" style={{ maxWidth: "18rem" }}>
        <div className="card-body">
          <h2 className="card-title mb-4">Update Password</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="newPassword" className="form-label">
                New Password:
              </label>
              <input
                type="password"
                className="form-control"
                id="newPassword"
                ref={newPasswordRef}
                required
              />
            </div>
            <div
              ref={errorRef}
              className="alert alert-danger"
              style={{ display: "none" }}
            ></div>
            <button type="submit" className="btn btn-primary">
              Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
