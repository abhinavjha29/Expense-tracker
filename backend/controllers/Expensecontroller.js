const expenseModel = require("../model/expenseModel");

const postDetail = async (req, res) => {
  try {
    // Extract data from the request body
    const { amount, description, category, date, id } = req.body;
    console.log("id is", req.user);
    // Create a new Expense document in the database
    await expenseModel.create({
      amount,
      description,
      category,
      date,
      id,

      user: req.user._id,
    });

    res.status(201).json({ message: "Expense added successfully" });
  } catch (err) {
    console.error("Error adding expense:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getDetail = async (req, res) => {
  try {
    const resp = await expenseModel.find({ user: req.user._id }).exec();
    console.log(resp);
    res.status(202).json({ msg: "data recived", resp });
  } catch (err) {
    res.status(500);
  }
};
const deleteExp = async (req, res) => {
  try {
    const { id } = req.params;
    const resp = await expenseModel.findOneAndDelete({
      id: id,
      user: req.user._id,
    });
    console.log(resp);
    res.status(202).json({ msg: "deleted", resp });
  } catch (Err) {
    console.log(Err);
  }
};
module.exports = { postDetail, getDetail, deleteExp };
