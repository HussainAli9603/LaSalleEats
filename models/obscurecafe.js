const mongoose = require('mongoose');


const cafeSchema = new mongoose.Schema({
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
     title: {
        type: String
    },
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

const Cafe = mongoose.model('Cafe', cafeSchema);

exports.Cafe = Cafe;