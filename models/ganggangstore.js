const mongoose = require('mongoose');

const gangSchema = new mongoose.Schema({
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

const Gang = mongoose.model('Gang', gangSchema);

exports.Gang = Gang;