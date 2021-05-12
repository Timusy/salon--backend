const express = require("express");
const { signup, signin, requireSignin} = require("../../controller/admin/auth");
const router = express.Router();


router.post("/admin/signup", signup);

router.post("/admin/signin", signin);

router.post("/admin/profile",requireSignin, (req,res)=>{
    res.status(400).json({user:"Profile"});
});

module.exports = router;