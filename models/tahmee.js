const mongoose = require('mongoose');

const tahmeeSchema = new mongoose.Schema({
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

const Tahmee = mongoose.model('Tahmee', tahmeeSchema);

exports.Tahmee = Tahmee;