const mongoose = require('mongoose');

const cheeseSchema = new mongoose.Schema({
    username:{
        type: String
    },
    token: {
        type: String
    },
    content: {
        type: String
    },
    likes: [{
        user:String
    }],
    dislikes: [{
        user:String
    }],
     title: {
        type: String
    },
    image: {
        type: String, // Store the image data as a String
    },
    commentFile:{
        type: String, // Store the image data as a String
     
    },
    rating:{
        type: Number
    },
    reviews:{
        type:Array
    },
});

const Cheese = mongoose.model('Cheese', cheeseSchema);

exports.Cheese = Cheese;