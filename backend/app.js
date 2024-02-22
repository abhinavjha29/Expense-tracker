const express = require("express");
const cors = require("cors");
const connectDB = require("./util/dbconnection");
const UserRoute = require("./Router/UserRouter");
const verifyRouter = require("./Router/verificationRouter");
const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use("/user", UserRoute);
app.use("/verify", verifyRouter);
const PORT = 5000;
app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log("Connected to MongoDB");
    console.log("Connected to port 5000");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
});
