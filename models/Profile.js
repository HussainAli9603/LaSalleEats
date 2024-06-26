const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    image: {
        type: String, // Store the image data as a String
    },
    username: {
        type: String,
        trim: true,
    },
    ID: {
        type: String,
        trim: true,
    },
    course: {
        type: String,
        trim: true,
    },
    bio: {
        type: String,
        trim: true,
    }
},{ timestamps: true });

const Profile = mongoose.model('Profile', profileSchema);

exports.Profile = Profile;