import React from "react";
import { useSelector } from "react-redux";
import { saveAs } from "file-saver"; // Import file-saver library for downloading files

function DownloadExpensesButton() {
  const expenses = useSelector((state) => state.data.data); // Assuming expenses are stored in the Redux store

  const convertToCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      Object.keys(expenses[0]).join(",") +
      "\n" +
      expenses.map((expense) => Object.values(expense).join(",")).join("\n");
    return encodeURI(csvContent);
  };

  const handleDownload = () => {
    const csvData = convertToCSV();
    const blob = new Blob([csvData], { type: "text/csv" });
    saveAs(blob, "expenses.csv");
  };

  return (
    <button className="btn btn-info" onClick={handleDownload}>
      Download Expenses
    </button>
  );
}

export default DownloadExpensesButton;
