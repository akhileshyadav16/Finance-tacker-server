const express = require("express");
const router = express.Router();


const {getExpenses,getExpenseById} = require("../controllers/getExpenses");
const {updateExpense} = require("../controllers/updateExpense");
const {deleteExpense} = require("../controllers/deleteExpense")
const {createExpense} = require("../controllers/createExpense");
const {login, signUp } = require("../controllers/auth");
const {auth} = require("../middleware/Auth");



router.post("/login",login);
router.post("/signup",signUp);
router.post("/create-expense",auth,createExpense);
router.get("/get-expenses",auth,getExpenses);

//router.get("/get-expense/:id",auth,getExpenseById)
router.put("/update-expense/:id",auth,updateExpense);
router.delete("/delete-expense/:id",auth,deleteExpense);



module.exports = router;