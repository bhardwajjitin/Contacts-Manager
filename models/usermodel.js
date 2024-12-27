const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"Enter Your Name Here"],
    },
    username: {
        type: String,
        required: [true, "Please Add the UserName"],
    },
    email: {
        type: String,
        required: [true, "Please Add the email Address"],
        unique:[true,"Email Address already taken"],
    },
    password:{
        type:String,
        require:[true,"Please Add the User Password"],
    }
},
{
    timestamps:true,
}
);

module.exports=mongoose.model("User",userSchema);