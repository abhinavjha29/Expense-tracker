import axios from "axios";

import React from "react";

const VerifyEmail = () => {
  const handleBtnClick = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    console.log(token);
    const resp = await axios.post(
      "http://localhost:5000/verify/email",

      {
        headers: {
          Authorization: token,
        },
      }
    );
  };
  return (
    <div>
      <button
        className="btn btn-danger"
        onClick={(e) => {
          handleBtnClick(e);
        }}
      >
        Click for verify Email
      </button>
    </div>
  );
};

export default VerifyEmail;
