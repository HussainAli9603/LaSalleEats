const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    image: {
        type: String, // Store the image data as a String
    },
    username: {
        type: String,
        trim: true,
    },
    education: {
        type: String,
        trim: true,
    },
    college: {
        type: String,
        trim: true,
    },
    profession: {
        type: String,
        trim: true,
    }
});

const Profile = mongoose.model('Profile', profileSchema);

exports.Profile = Profile;