import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addData } from "../../store";
import axios from "axios";

const ExpenseForm = () => {
  const moneySpentRef = useRef(null);
  const descriptionRef = useRef(null);
  const categoryRef = useRef(null);
  const dispatch = useDispatch();

  const dataForEdit = useSelector((state) => state.data.dataForEdit);

  if (dataForEdit && Object.keys(dataForEdit).length !== 0) {
    moneySpentRef.current.value = dataForEdit.amount;
    descriptionRef.current.value = dataForEdit.description;
    categoryRef.current.value = dataForEdit.category;
  }
  const token = localStorage.getItem("token");
  console.log(token);
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const amount = moneySpentRef.current.value;
      const description = descriptionRef.current.value;
      const category = categoryRef.current.value;

      const today = new Date();
      const date = today.toISOString().split("T")[0];
      const id = Date.now();
      const expenseData = { amount, description, category, date, id };
      const resp = await axios.post(
        "http://localhost:5000/expense/postDetail",
        expenseData,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (resp) {
        dispatch(addData(expenseData));
      } else {
        throw new Error();
      }
      // Here you can handle form submission, for example, sending the data to the server

      // Clear input fields
      moneySpentRef.current.value = "";
      descriptionRef.current.value = "";
      categoryRef.current.value = "";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Enter Your Expense Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="row gx-3">
          <div className="col-md-3">
            <label htmlFor="moneySpent" className="form-label">
              Money Spent
            </label>
            <input
              type="number"
              min={1}
              className="form-control"
              id="moneySpent"
              ref={moneySpentRef}
              required
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              ref={descriptionRef}
              required
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <select
              className="form-select"
              id="category"
              ref={categoryRef}
              required
            >
              <option value="">Select category</option>
              <option value="Food">Food</option>
              <option value="Petrol">Fuel</option>
              <option value="Salary">Rent</option>
              <option value="Extra">Rent</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <div className="col-md-3 d-flex align-items-end">
            <button type="submit" className="btn btn-danger mt-auto">
              Add Expense
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;
