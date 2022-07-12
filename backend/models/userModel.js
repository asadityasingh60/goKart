const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");     //Used to encrypt and dcrypt the password
const jwt = require("jsonwebtoken");    //For creating Web Token of every logged in User
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,"Please Enter your Name"],
        maxLength: [30,"Name cannot exceed 30 characters"],
        minLength: [4,"Name should have more than 4 characters"]
    },
    email:{
        type: String,
        required: true,
        unique:true,
        validate: [validator.isEmail,"Please enter valid Email"]
    },
    password:{
        type :String,
        required: [true,"Please Enter your Password"],
        minLength: [8, "Password should be greater than 8 Characters"],
        select: false                                 // While rendering User data, this section will selectively not be shown
    },
    avatar: {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
    },
    role: {
        type: String,
        default: "user"
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,
});


// Encrypting the Password
userSchema.pre("save",async function(next){

    if(!this.isModified("password")){
        next();
    };

    this.password = await bcrypt.hash(this.password,10);
    // https://www.npmjs.com/package/bcrypt
});

// JWT Token
userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn : process.env.JWT_EXPIRE,
        //https://jwt.io/introduction         JWT Token Stucture=> sign(Header Secret_Code Payload(Claims)),  Sign(JWT_SECRET) is kept secret so no one can access it
    });
};

// Compare Password
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
};


// Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function () {
    // Generating Token
    const resetToken = crypto.randomBytes(20).toString("hex");
    //crypto randomly choses 20 bit number and that number is converted to string in hexa decimal form(if not used hex, it will get garbage value)

    // Hashing and adding resetPasswordToken to userSchema
    this.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
  
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  
    return resetToken;
  };


module.exports = mongoose.model("User",userSchema);