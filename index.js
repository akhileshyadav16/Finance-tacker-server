const express = require("express");
const app = express();
const cors = require("cors")
const dbConnect = require("./config/database");
require("dotenv").config();
const expenseRoutes = require("./routes/finances");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use(cors({
    origin: [process.env.FE_URL],
    methods: "POST,GET,PUT,DELETE",
    credentials: true,
    allowedHeaders: 'Content-Type,Authorization',
}));


app.use(cookieParser());
app.use("/api/v1",expenseRoutes);



app.listen(PORT,()=>{
    console.log("Server started successfully at "+PORT);
});

app.get("/",(req,res)=>{
    res.json("Hello")
})

dbConnect();
