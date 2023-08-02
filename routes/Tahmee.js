const express = require('express');
const app = express();

app.get('/', (req, res) => {
    if (req.session.username) {
        res.render('Tahmee', { user: req.session.username });
    } 
    else {
        res.render('Tahmee');
}});

module.exports = app;