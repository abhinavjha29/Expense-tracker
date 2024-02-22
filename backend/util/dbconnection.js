require("dotenv").config({ path: "./.env" });

const mongoose = require("mongoose");
const user = process.env.db_userId;
const password = process.env.db_password;

const URL = `mongodb+srv://${user}:${password}@cluster0.pjvrnqu.mongodb.net/Expense-Tracker?retryWrites=true&w=majority`;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(URL);
    console.log(`MongoDB Connected: {conn.connection.host}`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};
module.exports = connectDB;
