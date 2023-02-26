const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {isEmail} = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
    name: {
        type: String ,
        required: [true,"Name is missing"],
        unique: true,
        lowercase: true,
    },
    email:{
        type: String,
        required: [true , "Email is missing"],
        unique: true,
        lowercase: true,
        validate: [isEmail , "Enter a valid email"]

    },
    password: {
        type: String ,
        required: [true , "Password is missing"],
        minlength: [6 , "ENTER A VALID PASSWORD (6 characters at least)"]
    },
} , {timestamps:true});

userSchema.pre("save" , async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password , salt);
    next();
});

userSchema.statics.login = async function(email,password){
    const user = await this.findOne({email});
    if(user)
    {
        const auth = await bcrypt.compare(password , user.password);
        if(auth)
        {
            return user;
        }
        throw Error('Incorrect Password');
    }
    throw Error('Incorrect Email');
};

const User = mongoose.model("User" , userSchema);
module.exports = User;







