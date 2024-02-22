import React from "react";
import { NavLink } from "react-router-dom";
import VerifyEmail from "../components/VerificationMail";

const HomePage = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <VerifyEmail />
          <div className="card">
            <div className="card-body">
              <h1 className="card-title text-center mb-4">Expense Tracker</h1>
              <p className="card-text text-center mb-4">
                Welcome to Expense Tracker! Keep track of your expenses easily
                with our app.
              </p>
              <div className="d-grid gap-2">
                <NavLink to="/login" className="btn btn-primary btn-lg">
                  Log In
                </NavLink>
                <NavLink to="/signup" className="btn btn-secondary btn-lg">
                  Sign Up
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
