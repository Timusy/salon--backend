const express = require("express");
const env = require("dotenv");

const app = express();

env.config();
app.get("/",(req,res)=>{
    res.send("Hello");
})

app.listen(process.env.PORT, () => {
    console.log(`Server started on ${process.env.PORT}`);
});
