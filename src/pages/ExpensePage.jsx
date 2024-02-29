import React, { useContext, useEffect, useState } from "react";
import ExpenseForm from "../components/Expense/ExpenseForm";
import ExpenseTable from "../components/Expense/ExpenseTable";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addData, editData, getData } from "../store";
import { UserContext } from "../store/UserStore/UserProvider";
import NotLoggedin from "../components/NotLoggedin";

const ExpensePage = () => {
  const expense = useSelector((state) => state.data.data);
  const dispatch = useDispatch();
  const { isLoggedIn } = useContext(UserContext);
  // const [data ,setData] = useState([]);
  const token = localStorage.getItem("token");
  console.log(expense);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const resp = await axios.get(
          "http://localhost:5000/expense/getDetail",
          {
            headers: {
              Authorization: token,
            },
          }
        );
        if (resp) {
          setIsLoading(false);
          console.log(resp.data);
          dispatch(getData(resp.data.resp));
        }
      } catch (error) {
        setIsLoading(false);
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  console.log(expense);
  return (
    <>
      {isLoggedIn && <ExpenseForm />}
      {!isLoading &&
        isLoggedIn &&
        (expense.length > 0 ? <ExpenseTable /> : <h1>Add some Expense</h1>)}
      {isLoading && <h1>...Loading</h1>}
      {!isLoggedIn && <NotLoggedin />}
    </>
  );
};

export default ExpensePage;
