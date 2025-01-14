const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require("../models/user");

exports.signUp = async(req,res)=>{
    try{
        const {
            name,
            email,
            password,
            cnfPassword
        } = req.body;
        if(!name || !email || !password || !cnfPassword){
            return res.status(403).json({
                success:false,
                message:'Please enter all fields'
            })
        }

        if(password!==cnfPassword){
            return res.status(400).json({
                success:false,
                message:'fill both password same',
            })
        }
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:'User already signup'
            })
        }

        const hashedPassword = await bcrypt.hash(password,10);


        const savedData = await User.create({
            name,
            email,
            password:hashedPassword,
        });

        res.status(200).json({
            success:true,
            savedData,
            message:'Sign up successfully',
        })

    }catch(error){
        return res.status(401).json({
            success:false,
            message:'failed in sign up',
        })
    }
}

//login

exports.login = async (req,res)=>{
    try{
        const {email,password} = req.body;
        if(!password || !email){
            return res.status(403).json({
                succeess:false,
                message:'enter all fields for login'
            })
        }

        const existingUser = await User.findOne({email});
        if(!existingUser){
            return res.status(400).json({
                success:'false',
                message:'Please sign up firstly',
            })
        }
        const match = await bcrypt.compare(password,existingUser.password);
        
        if(match){
            const payload = {
                email:existingUser.email,
                id:existingUser._id
            }

            const token = jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:'5h',
            })

            existingUser.token = token;
            existingUser.password = undefined;

        
            return res.status(200).json({
                success:true,
                token,
                existingUser,
                message:'User login successfully',
            })

            
        }else{
            return res.status(400).json({
                success:'false',
                message:'Wrong password entered,login failed',
            })
        }


    }catch(error){
        console.log(error);
        return res.status(401).json({
            success:false,
            message:'something went wrong during login',
        })
    }

}


