const Finance = require("../models/finance");
const User = require("../models/user")

exports.deleteExpense = async (req,res)=>{
    try{
        const {id} = req.params;
        const deletedExpense = await Finance.findByIdAndDelete(id);
        console.log("deleted Expense :",deletedExpense);

        await User.findOneAndUpdate(
            { _id: deletedExpense.user },
            { $pull: { expenses: id } },
            { new: true }
        );

        res.status(200).json({
            success:true,
            message:"Expense deleted successfully",
        })

    } catch(error){
        res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}