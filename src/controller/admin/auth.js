const User = require("../../models/user");
const jwt=require("jsonwebtoken");

exports.signup=(req,res)=>{
    User.findOne({ email: req.body.email })
        .exec((err, user) => {
            if (user){
                return res.status(400).json({
                    message: "Admin already exist!"
                });
            }

            const {
                firstName,
                lastName,
                email,
                password
            } = req.body;
            const _user = new User({
                firstName,
                lastName,
                email,
                password,
                role:"admin"
            });
            _user.save((err, data) => {
                if (err){
                    console.log(err);
                    return res.status(400).json({
                        message: "Something went wrong"
                    });
                }
                if (data){
                    return res.status(201).json({
                        message:"Admin created Successfully"
                    });
                }
            })

        })
}

exports.signin=(req,res)=>{
    User.findOne({email:req.body.email})
    .exec((err,user)=>{
        if(err)
        {
            return res.status(400).json({err});
        }
        if(user){
           if(user.authenticate(req.body.password) && user.role==="admin"){
            const token=jwt.sign({_id:user._id},process.env.JWT_SECRETKEY,{expiresIn:'100d'});
            const {_id,firstName,lastName,email,role,fullName}=user;
            return res.status(200).json({
              token,
              user:{_id,firstName,lastName,email,role,fullName}
            });
           }
           else{
            return res.status(400).json({message:"Invalid Password"});
           }
        }
        else{
            
            return res.status(400).json({message:"User doesn't exist!!!"});
        }
    });
}

exports.requireSignin=function(req,res,next){
    const token=req.headers.authorization.split(" ")[1];
    const user=jwt.verify(token,process.env.JWT_SECRETKEY);
    req.user=user;
    next();
    
  }