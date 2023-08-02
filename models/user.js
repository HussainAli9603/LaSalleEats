const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    re_password: {
        type: String,
        required: true,
        trim: true,
    },
    Auth: Boolean,
    tokens: [{
        token: {
            type: String,
            trim: true
        }
    }]
});

userSchema.methods.generateAuthToken = async function(){
    try{
        console.log(this._id);
        const token = jwt.sign({ _id: this._id.toString(), Auth: this.Auth}, process.env.JWT_KEY,{expiresIn:"3 week"});
        this.tokens = this.tokens.concat({token:token})
        await this.save();
        return token;
    }
    catch(error)
    {
        console.log("The error part ", error);
        res.send("The error part ", error);
    }
}
userSchema.methods.generateAuthToken1 = async function(){
    try{
        console.log(this._id);
        const token = jwt.sign({ _id: this._id.toString(), Auth: this.Auth}, process.env.JWT_KEY);
        this.tokens = this.tokens.concat({token:token})
        await this.save();
        return token;
    }
    catch(error)
    {
        console.log("The error part ", error);
        res.send("The error part ", error);
    }
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = {
        username: Joi.string().required().trim(),
        password: Joi.required(),
        re_password: Joi.required()
    }

    return Joi.validate(user, schema);
}

exports.User = User;
exports.validateUser = validateUser;