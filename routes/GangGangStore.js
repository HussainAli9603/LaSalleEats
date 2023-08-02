const express = require('express');
const app = express();

app.get('/', (req, res) => {
    if (req.session.username) {
        res.render('GangGangStore', { user: req.session.username });
    } 
    else {
        res.render('GangGangStore');
    }
});

module.exports = app;