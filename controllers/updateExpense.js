const Finance = require("../models/finance");

exports.updateExpense = async (req,res)=>{
    try{
        const {id} = req.params;
        const {title,category,amount,date} = req.body;
        if(!title || !category || !amount){
            return res.status(500).json({
                success:false,
                message:"all field required"
            })
        }

        const updatedExpense = await Finance.findByIdAndUpdate(
            {_id:id},
            {
                title:title,
                category:category,
                amount:amount,
                date:date,
            },
            { new:true }
        );

        res.status(200).json({
            success:true,
            updatedData : updatedExpense,
            message:"Finance updated successfully"
        })

    }catch(err){
        console.log("Finance updation failed"),
        res.status(500).json({
            success:false,
            error:err.message,
        })        
    }
}
