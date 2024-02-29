import React, { useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { UserContext } from "../store/UserStore/UserProvider";

const Header = () => {
  const location = useLocation();
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
  const handleLogoutbtn = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("emailVerified");
    setIsLoggedIn(false);
  };
  return (
    <header className="p-3 text-bg-dark">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <NavLink
            to="/"
            className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
          >
            <svg
              className="bi me-2"
              width="40"
              height="32"
              role="img"
              aria-label="Bootstrap"
            >
              <use xlinkHref="#bootstrap"></use>
            </svg>
          </NavLink>

          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li>
              <NavLink
                to="/"
                className={`nav-link px-2 text-secondary ${
                  location.pathname === "/" ? "active" : ""
                }`}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/features"
                className={`nav-link px-2 text-white ${
                  location.pathname === "/features" ? "active" : ""
                }`}
              >
                Features
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/pricing"
                className={`nav-link px-2 text-white ${
                  location.pathname === "/pricing" ? "active" : ""
                }`}
              >
                Pricing
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/faqs"
                className={`nav-link px-2 text-white ${
                  location.pathname === "/faqs" ? "active" : ""
                }`}
              >
                FAQs
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={`nav-link px-2 text-white ${
                  location.pathname === "/about" ? "active" : ""
                }`}
              >
                About
              </NavLink>
            </li>
          </ul>

          <form
            className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3"
            role="search"
          >
            <input
              type="search"
              className="form-control form-control-dark text-bg-dark"
              placeholder="Search..."
              aria-label="Search"
            />
          </form>
          {isLoggedIn && (
            <div className="text-end">
              <button
                className="btn btn-danger"
                onClick={(e) => handleLogoutbtn(e)}
              >
                Log Out
              </button>
            </div>
          )}
          {!isLoggedIn && (
            <div className="text-end">
              <NavLink to="/login" className="btn btn-outline-light me-2">
                Login
              </NavLink>
              <NavLink to="/signup" className="btn btn-warning">
                Sign-up
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
