const mongoose = require('mongoose');

const chickenSchema = new mongoose.Schema({
    username:{
        type: String
    },
    token: {
        type: String
    },
    content: {
        type: String
    },
    title: {
        type: String
    },
    likes: [{
        user:String
    }],
    dislikes: [{
        user:String
    }],
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

const Chicken = mongoose.model('24Chicken', chickenSchema);

exports.Chicken = Chicken;