const express = require("express");
const env = require("dotenv");

const app = express();
app.use(express.json());

env.config();
app.get("/",(req,res)=>{
    res.send("Hello");
})

app.listen(process.env.PORT, () => {
    console.log(`Server started on ${process.env.PORT}`);
});
