const mongoose = require('mongoose');

const helpfullSchema = new mongoose.Schema({
    username:{
        type: String
    },
    token: {
        type: String
    },
    content: {
        type: String
    }
});

const Helpful = mongoose.model('Helpful', helpfullSchema);

exports.Helpful = Helpful;