import React from "react";
import { toggleTheme } from "../../store";
import DownloadExpensesButton from "../DownloadExpenseButton";
import { useDispatch } from "react-redux";

const Premiumbtn = () => {
  const dispatch = useDispatch();

  const handleThemeBtn = (e) => {
    e.preventDefault();
    dispatch(toggleTheme());
  };

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col">
          <button
            className="btn btn-success me-2"
            onClick={(e) => handleThemeBtn(e)}
          >
            Change Theme
          </button>
        </div>
        <div className="col">
          <DownloadExpensesButton />
        </div>
      </div>
    </div>
  );
};

export default Premiumbtn;
