import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addData,
  deleteData,
  editData,
  isPremiumFn,
  showPremiumBtn,
  toggleTheme,
} from "../../store";
import axios from "axios";

import Premiumbtn from "./Premiumbtn";

const ExpenseTable = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  // Sample expenses data with added "date" property
  const expenseData = useSelector((state) => state.data.data);
  const TotalAmount = useSelector((state) => state.data.totalAmount);

  const expenses = expenseData;

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  };
  const showPremium = useSelector((state) => state.theme.showPremiumBtn);
  const isPremium = useSelector((state) => state.data.isPremium);
  const handlePremBtn = async (e) => {
    e.preventDefault();

    dispatch(showPremiumBtn());
    dispatch(isPremiumFn());
  };
  const handleDelete = async (expense) => {
    try {
      const id = expense.id;
      const resp = await axios.delete(
        `http://localhost:5000/expense/delete/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (resp) {
        dispatch(deleteData(expense));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = async (expense) => {
    // Handle edit logic here
    try {
      const id = expense.id;
      const resp = await axios.delete(
        `http://localhost:5000/expense/delete/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (resp) {
        dispatch(editData(expense));
        dispatch(deleteData(expense));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-5">
      {TotalAmount > 1000 && showPremium && (
        <button
          className="btn btn-primary"
          onClick={(e) => {
            handlePremBtn(e);
          }}
        >
          Premium User
        </button>
      )}
      {isPremium && (
        <div className="container mt-3">
          <Premiumbtn />
        </div>
      )}

      <h2>Expense Table</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Date Added</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.description}</td>
              <td>{expense.category}</td>
              <td>₹{expense.amount}</td>
              <td>{formatDate(expense.date)}</td>
              <td>
                <button
                  className="btn btn-sm btn-danger me-1"
                  onClick={() => handleDelete(expense)}
                >
                  Delete
                </button>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => handleEdit(expense)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseTable;
