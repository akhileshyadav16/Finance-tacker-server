const User = require("../models/user")
const Finance = require("../models/finance");

exports.getExpenses = async (req, res) => {
  try {
    //fetch all item from DB
    const {id} = req.existingUser;
    const expenses = await User.findById(id,{expenses:true}).populate("expenses").exec();
    //response
    res.status(200).json({
      success: true,
      data: expenses,
      message: "Entire expenses data is fetched",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: err.message,
      message: "something went wrong in fetching all expenses",
    });
  }
};

exports.getExpenseById = async (req, res) => {
  try {
    //extract item by id
    const {id} = req.params;
    const expense = await Finance.findById(id);
    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "No data Found with given id",
      });
    }
    res.status(200).json({
      success: true,
      message: `Data is found by given id: ${id}`,
      data: expense,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: err.message,
      message: "something went wrong in get expense",
    });
  }
};
