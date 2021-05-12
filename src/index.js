const express = require("express");
const env = require("dotenv");
const bodyParser=require("body-parser");
const mongoose = require('mongoose');
const userRoutes=require("./routes/auth");
const adminRoutes=require("./routes/admin/auth");

env.config();

const app = express();
//app.use(express.json());
app.use(bodyParser());
app.use(bodyParser.urlencoded({extended: true}));




mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.fobqx.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,{ useNewUrlParser: true , useUnifiedTopology: true,useCreateIndex:true}).then(console.log("Database connected"));


app.use('/api',userRoutes);
app.use('/api',adminRoutes);

app.use((req, res) => {
    res.status(404).json({
        success: false,
        msg: "Page not found!!!"
    })
})

app.listen(process.env.PORT, () => {
    console.log(`Server started on ${process.env.PORT}`);
});
