const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
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

const Store = mongoose.model('Store', storeSchema);

exports.Store = Store;