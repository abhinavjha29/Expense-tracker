import React, { useContext } from "react";

import { NavLink } from "react-router-dom";

const NotLoggedin = () => {
  return (
    <>
      <NavLink to={"/login"}>
        <button className="btn btn-secondary"> Please Login to Continue</button>
      </NavLink>
      <NavLink to={"/signup"}>
        <button className="btn btn-secondary"> New ?? Create Account</button>
      </NavLink>
    </>
  );
};

export default NotLoggedin;
