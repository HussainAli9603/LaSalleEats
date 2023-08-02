const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URL, {
    useNewURLParser: true,
    useUnifiedTopology:true,
    family: 4
})
    .then(() => { console.log('Connected to Mongodb')})
    .catch((err) => { console.log(`Connection failed: ${err}`)})