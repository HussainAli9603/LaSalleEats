const express = require('express');
const app = express();
const { Chicken } = require('../models/24chicken')
const { Cheese } = require('../models/everythingbutcheese')
const { Gang } = require('../models/ganggangstore')
const { Cafe } = require('../models/obscurecafe')
const { Store } = require('../models/store')
const { Profile } = require('../models/Profile')
const { Tahmee } = require('../models/tahmee')
const { User, validateUser } = require('../models/user');
const Joi = require('joi');
const bcrypt = require('bcrypt');


//rendering homepage
app.get('/', async(req, res) => {
    var profile = await Profile.findOne({username:req.session.username})
    var chicken = await Chicken.find({})
    var cheese = await Cheese.find({})
    var store = await Store.find({})
    var cafe = await Cafe.find({})

    let avg = 0;
      chicken.forEach((rev) => {
         avg += rev.rating;
      });
    var totalRating = avg / chicken.length;
    var star1 = [];
    var emptyStar1 = []
    for (var i = 1; i <= totalRating; i++ ) {
        star1.push(i)
     }
    for (var i = star1.length + 1; i <= 5; i++ ) {
            emptyStar1.push(i)
     }
    var pushChicken = [];
    var chickenHighRating = {
       rating:avg,
       image:"images/store/24chicken.jpg",
       name:"24Chicken",
       desc:"Serving happiness at a budget friendly price since 2017.Selling delicious Korean Fried Chicken is not our only goal. Being part of our customers’ lives and communities is what we aim for.",
       star:star1,
       emptyStar:emptyStar1
    }
   pushChicken.push(chickenHighRating)
   // console.log(pushChicken)





   let avg1 = 0;
    cheese.forEach((rev) => {
        avg1 += rev.rating;
      });
   var totalRating1 = avg1 / cheese.length;
   var star2 = [];
    var emptyStar2 = []
    for (var i = 1; i <= totalRating1; i++ ) {
        star2.push(i)
     }
    for (var i = star2.length + 1; i <= 5; i++ ) {
            emptyStar2.push(i)
     }
    var pushCheese = [];
    var cheeseHighRating = {
       rating:avg1,
       image:"images/store/EBC.png",
       name:"Everything But Cheese",
       desc:"If you love CHEEEESE,you're looking in the right place.#TheCheesiestPlaceOnEarth",
       star:star2,
       emptyStar:emptyStar2
    } 
    pushCheese.push(cheeseHighRating)
   // console.log(pushCheese)



   let avg2 = 0;
    store.forEach((rev) => {
        avg2 += rev.rating;
      });
   var totalRating2 = avg2 / store.length;
    var star3 = [];
    var emptyStar3 = []
    for (var i = 1; i <= totalRating2; i++ ) {
        star3.push(i)
     }
    for (var i = star3.length + 1; i <= 5; i++ ) {
            emptyStar3.push(i)
     }
    var pushStore = [];
    var storeHighRating = {
       rating:avg2,
       image:"images/store/tahmee.jpg",
       name:"El Poco Cantina",
       desc:"The best and most authentic birria around town.Come and experience the greatest Birria you've ever tasted!",
       star:star3,
       emptyStar:emptyStar3
    }
    pushStore.push(storeHighRating)
   // console.log(pushStore) 

  
   let avg3 = 0;
    cafe.forEach((rev) => {
        avg3 += rev.rating;
      });
   var totalRating3 = avg3 / cafe.length;
   var star4 = [];
    var emptyStar4 = []
    for (var i = 1; i <= totalRating3; i++ ) {
        star4.push(i)
    }
    for (var i = star4.length + 1; i <= 5; i++ ) {
            emptyStar4.push(i)
    }
    var pushCafe = [];
    var cafeHighRating = {
       rating:avg3,
       image:"images/store/obscurecafe.jpg",
       name:"Obscure Cafe",
       desc:"Would you like an Adventure now, or shall We have our coffee first?",
       star:star4,
       emptyStar:emptyStar4
    } 
    pushCafe.push(cafeHighRating)
   // console.log(pushCafe) 

    var allData = [chickenHighRating,cheeseHighRating,storeHighRating,cafeHighRating]

    // Create a function to sort the arrays by rating.
    const sortByRating =  allData.sort((a, b) => b.rating - a.rating);


    if (req.session.username) {
        res.render('Homepage', { user: req.session.username,profile:profile,sortByRating:sortByRating });
    } 
    else {
        res.render('Homepage',{sortByRating:sortByRating});
    }
});


//rendering homepage when home is pressed
app.get('/Homepage', async(req, res) => {
    var profile = await Profile.findOne({username:req.session.username})
    var chicken = await Chicken.find({})
    var cheese = await Cheese.find({})
    var store = await Store.find({})
    var cafe = await Cafe.find({})

    let avg = 0;
      chicken.forEach((rev) => {
         avg += rev.rating;
      });
    var totalRating = avg / chicken.length;
    var star1 = [];
    var emptyStar1 = []
    for (var i = 1; i <= totalRating; i++ ) {
        star1.push(i)
     }
    for (var i = star1.length + 1; i <= 5; i++ ) {
            emptyStar1.push(i)
     }
    var pushChicken = [];
    var chickenHighRating = {
       rating:avg,
       image:"images/store/24chicken.jpg",
       name:"24Chicken",
       desc:"Serving happiness at a budget friendly price since 2017.Selling delicious Korean Fried Chicken is not our only goal. Being part of our customers’ lives and communities is what we aim for.",
       star:star1,
       emptyStar:emptyStar1
    }
   pushChicken.push(chickenHighRating)
   // console.log(pushChicken)





   let avg1 = 0;
    cheese.forEach((rev) => {
        avg1 += rev.rating;
      });
   var totalRating1 = avg1 / cheese.length;
   var star2 = [];
    var emptyStar2 = []
    for (var i = 1; i <= totalRating1; i++ ) {
        star2.push(i)
     }
    for (var i = star2.length + 1; i <= 5; i++ ) {
            emptyStar2.push(i)
     }
    var pushCheese = [];
    var cheeseHighRating = {
       rating:avg1,
       image:"images/store/EBC.png",
       name:"Everything But Cheese",
       desc:"If you love CHEEEESE,you're looking in the right place.#TheCheesiestPlaceOnEarth",
       star:star2,
       emptyStar:emptyStar2
    } 
    pushCheese.push(cheeseHighRating)
   // console.log(pushCheese)



   let avg2 = 0;
    store.forEach((rev) => {
        avg2 += rev.rating;
      });
   var totalRating2 = avg2 / store.length;
    var star3 = [];
    var emptyStar3 = []
    for (var i = 1; i <= totalRating2; i++ ) {
        star3.push(i)
     }
    for (var i = star3.length + 1; i <= 5; i++ ) {
            emptyStar3.push(i)
     }
    var pushStore = [];
    var storeHighRating = {
       rating:avg2,
       image:"images/store/tahmee.jpg",
       name:"El Poco Cantina",
       desc:"The best and most authentic birria around town.Come and experience the greatest Birria you've ever tasted!",
       star:star3,
       emptyStar:emptyStar3
    }
    pushStore.push(storeHighRating)
   // console.log(pushStore) 

  
   let avg3 = 0;
    cafe.forEach((rev) => {
        avg3 += rev.rating;
      });
   var totalRating3 = avg3 / cafe.length;
   var star4 = [];
    var emptyStar4 = []
    for (var i = 1; i <= totalRating3; i++ ) {
        star4.push(i)
    }
    for (var i = star4.length + 1; i <= 5; i++ ) {
            emptyStar4.push(i)
    }
    var pushCafe = [];
    var cafeHighRating = {
       rating:avg3,
       image:"images/store/obscurecafe.jpg",
       name:"Obscure Cafe",
       desc:"Would you like an Adventure now, or shall We have our coffee first?",
       star:star4,
       emptyStar:emptyStar4
    } 
    pushCafe.push(cafeHighRating)
   // console.log(pushCafe) 

    var allData = [chickenHighRating,cheeseHighRating,storeHighRating,cafeHighRating]

    // Create a function to sort the arrays by rating.
    const sortByRating =  allData.sort((a, b) => b.rating - a.rating);

    if (req.session.username) {
        res.render('Homepage', { user: req.session.username,profile:profile,sortByRating:sortByRating });
    } 
    else {
        res.render('Homepage',{sortByRating:sortByRating});
    }
});

// //rendering restrauants when restaruants is pressed
// app.get('/restolist', (req, res) => {
//     if (req.session.username) {
//         res.render('restolist', { user: req.session.username });
//     } 
//     else {
//         res.render('restolist');
//     }
// });
  
// Route to handle signup form submission
app.post('/signup', async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.send(`Error: ${error}`);

    let { username, password, re_password } = req.body;
    const Auth = true;

    let user = await User.findOne({ username });
    if(user) return res.status(400).send('User already register!');

    if (password != re_password) return res.status(400).send('Passwords do not match!');

    user = new User({
        username, password, re_password, Auth
    });

    console.log(user);

    const token = await user.generateAuthToken();
    console.log(token);

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    user.re_password = await bcrypt.hash(user.re_password, salt);

    user = await user.save();
    res.header('token', token).render('/');
});

app.post('/24signup', async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.send(`Error: ${error}`);

    let { username, password, re_password } = req.body;
    const Auth = true;

    let user = await User.findOne({ username });
    if(user) return res.status(400).send('User already register!');

    if (password != re_password) return res.status(400).send('Passwords do not match!');

    user = new User({
        username, password, re_password, Auth
    });

    console.log(user);

    const token = await user.generateAuthToken();
    console.log(token);

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    user.re_password = await bcrypt.hash(user.re_password, salt);

    user = await user.save();
    res.header('token', token).render('24Chicken');
});

app.post('/cheesesignup', async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.send(`Error: ${error}`);

    let { username, password, re_password } = req.body;
    const Auth = true;

    let user = await User.findOne({ username });
    if(user) return res.status(400).send('User already register!');

    if (password != re_password) return res.status(400).send('Passwords do not match!');

    user = new User({
        username, password, re_password, Auth
    });

    console.log(user);

    const token = await user.generateAuthToken();
    console.log(token);

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    user.re_password = await bcrypt.hash(user.re_password, salt);

    user = await user.save();
    res.header('token', token).render('EverythingButCheese');
});

app.post('/gangsignup', async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.send(`Error: ${error}`);

    let { username, password, re_password } = req.body;
    const Auth = true;

    let user = await User.findOne({ username });
    if(user) return res.status(400).send('User already register!');

    if (password != re_password) return res.status(400).send('Passwords do not match!');

    user = new User({
        username, password, re_password, Auth
    });

    console.log(user);

    const token = await user.generateAuthToken();
    console.log(token);

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    user.re_password = await bcrypt.hash(user.re_password, salt);

    user = await user.save();
    res.header('token', token).render('GangGangStore');
});

app.post('/cafesignup', async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.send(`Error: ${error}`);

    let { username, password, re_password } = req.body;
    const Auth = true;

    let user = await User.findOne({ username });
    if(user) return res.status(400).send('User already register!');

    if (password != re_password) return res.status(400).send('Passwords do not match!');

    user = new User({
        username, password, re_password, Auth
    });

    console.log(user);

    const token = await user.generateAuthToken();
    console.log(token);

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    user.re_password = await bcrypt.hash(user.re_password, salt);

    user = await user.save();
    res.header('token', token).render('ObscureCafe');
});

app.post('/restosignup', async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.send(`Error: ${error}`);

    let { username, password, re_password } = req.body;
    const Auth = true;

    let user = await User.findOne({ username });
    if(user) return res.status(400).send('User already register!');

    if (password != re_password) return res.status(400).send('Passwords do not match!');

    user = new User({
        username, password, re_password, Auth
    });

    console.log(user);

    const token = await user.generateAuthToken();
    console.log(token);

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    user.re_password = await bcrypt.hash(user.re_password, salt);

    user = await user.save();
    res.header('token', token).render('restolist');
});

app.post('/storesignup', async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.send(`Error: ${error}`);

    let { username, password, re_password } = req.body;
    const Auth = true;

    let user = await User.findOne({ username });
    if(user) return res.status(400).send('User already register!');

    if (password != re_password) return res.status(400).send('Passwords do not match!');

    user = new User({
        username, password, re_password, Auth
    });


    const token = await user.generateAuthToken();
    console.log(token);

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    user.re_password = await bcrypt.hash(user.re_password, salt);

    user = await user.save();
    res.header('token', token).render('store');
});

app.post('/tahmeesignup', async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.send(`Error: ${error}`);

    let { username, password, re_password } = req.body;
    const Auth = true;

    let user = await User.findOne({ username });
    if(user) return res.status(400).send('User already register!');

    if (password != re_password) return res.status(400).send('Passwords do not match!');

    user = new User({
        username, password, re_password, Auth
    });

    const token = await user.generateAuthToken();
    console.log(token);

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    user.re_password = await bcrypt.hash(user.re_password, salt);

    user = await user.save();
    res.header('token', token).render('Tahmee');
});

// Route to handle login form submission
app.post('/login', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.send(`Error: ${error}`);
    
    let { username, password, rememberMe } = req.body;
    let user = await User.findOne({ username });
    if(!user) return res.status(400).send('Invalid Credentails!');

    const validPassword = await bcrypt.compare(password, user.password);
    if(!validPassword) return res.status(400).send('Invalid Credentails!');

    req.session.username = username;
    
    if(rememberMe){

     console.log('Login attempt:');
     console.log('Username:', username);
     console.log('Password:', password);

     const token = await user.generateAuthToken();
     console.log("rememberMe",token);
    
     res.header('token', token).render('Homepage', {user: username});
   }else{
     const token = await user.generateAuthToken1();
     console.log(token);
    
     res.header('token', token).render('Homepage', {user: username});
   } 
});

app.post('/24login', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.send(`Error: ${error}`);
    
    let { username, password, rememberMe } = req.body;

    let user = await User.findOne({ username });
    if(!user) return res.status(400).send('Invalid Credentails!');

    const validPassword = await bcrypt.compare(password, user.password);
    if(!validPassword) return res.status(400).send('Invalid Credentails!');

    req.session.username = username;

    if(rememberMe){

     console.log('Login attempt:');
     console.log('Username:', username);
     console.log('Password:', password);

     const token = await user.generateAuthToken();
     console.log("rememberMe",token);
    
     res.header('token', token).render('24Chicken', {user: username});
   }else{
     const token = await user.generateAuthToken1();
     console.log(token);
    
     res.header('token', token).redirect('24Chicken');
   } 

});

app.post('/cheeselogin', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.send(`Error: ${error}`);
    
    let { username, password, rememberMe } = req.body;

    let user = await User.findOne({ username });
    if(!user) return res.status(400).send('Invalid Credentails!');

    const validPassword = await bcrypt.compare(password, user.password);
    if(!validPassword) return res.status(400).send('Invalid Credentails!');

    req.session.username = username;

    if(rememberMe){

     console.log('Login attempt:');
     console.log('Username:', username);
     console.log('Password:', password);

     const token = await user.generateAuthToken();
     console.log("rememberMe",token);
    
     res.header('token', token).render('EverythingButCheese', {user: username});
   }else{
     const token = await user.generateAuthToken1();
     console.log(token);
    
     res.header('token', token).redirect('/EverythingButCheese');
   } 

});

app.post('/ganglogin', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.send(`Error: ${error}`);
    
    let { username, password, rememberMe } = req.body;

    let user = await User.findOne({ username });
    if(!user) return res.status(400).send('Invalid Credentails!');

    const validPassword = await bcrypt.compare(password, user.password);
    if(!validPassword) return res.status(400).send('Invalid Credentails!');

    req.session.username = username;

    if(rememberMe){

     console.log('Login attempt:');
     console.log('Username:', username);
     console.log('Password:', password);

     const token = await user.generateAuthToken();
     console.log("rememberMe",token);
    
     res.header('token', token).render('GangGangStore', {user: username});
   }else{
     const token = await user.generateAuthToken1();
     console.log(token);
    
     res.header('token', token).render('GangGangStore', {user: username});
   }

});

app.post('/cafelogin', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.send(`Error: ${error}`);
    
    let { username, password, rememberMe } = req.body;

    let user = await User.findOne({ username });
    if(!user) return res.status(400).send('Invalid Credentails!');

    const validPassword = await bcrypt.compare(password, user.password);
    if(!validPassword) return res.status(400).send('Invalid Credentails!');

    req.session.username = username;

    if(rememberMe){

     console.log('Login attempt:');
     console.log('Username:', username);
     console.log('Password:', password);

     const token = await user.generateAuthToken();
     console.log("rememberMe",token);
    
     res.header('token', token).render('ObscureCafe', {user: username});
   }else{
     const token = await user.generateAuthToken1();
     console.log(token);
    
     res.header('token', token).redirect('/ObscureCafe');
   }

});

app.post('/restologin', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.send(`Error: ${error}`);
    
    let { username, password, rememberMe } = req.body;

    let user = await User.findOne({ username });
    if(!user) return res.status(400).send('Invalid Credentails!');

    const validPassword = await bcrypt.compare(password, user.password);
    if(!validPassword) return res.status(400).send('Invalid Credentails!');

    req.session.username = username;

    if(rememberMe){

     console.log('Login attempt:');
     console.log('Username:', username);
     console.log('Password:', password);

     const token = await user.generateAuthToken();
     console.log("rememberMe",token);
    
     res.header('token', token).render('restolist', {user: username});
   }else{
     const token = await user.generateAuthToken1();
     console.log(token);
    
     res.header('token', token).render('restolist', {user: username});
   }

 
});

app.post('/storelogin', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.send(`Error: ${error}`);
    
    let { username, password, rememberMe} = req.body;

    let user = await User.findOne({ username });
    if(!user) return res.status(400).send('Invalid Credentails!');

    const validPassword = await bcrypt.compare(password, user.password);
    if(!validPassword) return res.status(400).send('Invalid Credentails!');

    req.session.username = username;

     if(rememberMe){

     console.log('Login attempt:');
     console.log('Username:', username);
     console.log('Password:', password);

     const token = await user.generateAuthToken();
     console.log("rememberMe",token);
    
     res.header('token', token).render('store', {user: username});
   }else{
     const token = await user.generateAuthToken1();
     console.log(token);
    
     res.header('token', token).redirect('/store');
   }

});

app.post('/tahmeelogin', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.send(`Error: ${error}`);
    
    let { username, password, rememberMe } = req.body;

    let user = await User.findOne({ username });
    if(!user) return res.status(400).send('Invalid Credentails!');

    const validPassword = await bcrypt.compare(password, user.password);
    if(!validPassword) return res.status(400).send('Invalid Credentails!');

    req.session.username = username;

    if(rememberMe){

     console.log('Login attempt:');
     console.log('Username:', username);
     console.log('Password:', password);

     const token = await user.generateAuthToken();
     console.log("rememberMe",token);
    
     res.header('token', token).render('Tahmee', {user: username});
   }else{
     const token = await user.generateAuthToken1();
     console.log(token);
    
     res.header('token', token).render('Tahmee', {user: username});
   }

});

//deleting the session when logged out
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
      }
      res.redirect('/Homepage'); 
    });
});

app.get('/24logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
      }
      res.redirect('/24Chicken'); 
    });
});

app.get('/cheeselogout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
      }
      res.redirect('/EverythingButCheese'); 
    });
});

app.get('/ganglogout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
      }
      res.redirect('/GangGangStore'); 
    });
});

app.get('/cafelogout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
      }
      res.redirect('/ObscureCafe'); 
    });
});

app.get('/restologout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
      }
      res.redirect('/restolist'); 
    });
});

app.get('/storelogout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
      }
      res.redirect('/store'); 
    });
});

app.get('/tahmeelogout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
      }
      res.redirect('/Tahmee'); 
    });
});

// Route to handle comment submission
app.post('/storesubmit_comment', async (req, res) => {
    const username = req.session.username;
    const token = req.session.token
    let content = req.body.comment;

    let store = await new Store({
        username, token, content
    });

    store = await store.save();
    res.render('store', {user: username, comment: content});
});

// app.post('/24submit_comment', async (req, res) => {
//     const username = req.session.username;
//     const token = req.session.token
//     let content = req.body.comment;
//     console.log('Content:', content);

//     let chicken = await new Chicken({
//         username, token, content
//     });

//     chicken = await chicken.save();
//     res.redirect('/24Chicken');
// });




app.post('/gangsubmit_comment', async (req, res) => {
    const username = req.session.username;
    const token = req.session.token
    let content = req.body.comment;

    let gang = await new Gang({
        username, token, content
    });

    gang = await gang.save();
    res.render('GangGangStore', {user: username, comment: content});
});



app.post('/tahmeesubmit_comment', async (req, res) => {
    const username = req.session.username;
    const token = req.session.token
    let content = req.body.comment;
    console.log('Content:', content);

    let tahmee = await new Tahmee({
        username, token, content
    });

    tahmee = await tahmee.save();
    res.render('Tahmee', {user: username, comment: content});
});

//validating the login criteria
function validate(req) {
  const schema = {
      username: Joi.string().required().trim(),
      password: Joi.required(),
      rememberMe: Joi.string(),
  };
  return Joi.validate(req, schema);
}

// Implement the search function
// app.get('/search', async (req, res) => {

//   if(req.query.user != undefined && req.query.user !=""){
//      var allData = []

//       let chicken = await Chicken.find({content : {$regex: new RegExp(req.query.user, 'i')}}).lean();
//              if(chicken != null && chicken !=""){
//                 for (const product of chicken) {
//                     await allData.push(product);
//                }
//              }

//       let store = await Store.find({content : {$regex: new RegExp(req.query.user, 'i')}}).lean();
//              if(store != null && store !=""){
//                 for (const product of store) {
//                     await allData.push(product);
//                }
//              }

//       let cafe = await Cafe.find({content : {$regex: new RegExp(req.query.user, 'i')}}).lean();
//              if(cafe != null && cafe !=""){
//                 for (const product of cafe) {
//                     await allData.push(product);
//                }
//              }
//       let cheese = await Cheese.find({content : {$regex: new RegExp(req.query.user, 'i')}}).lean();
//              if(cheese != null && cheese !=""){
//                 for (const product of cheese) {
//                     await allData.push(product);
//                }
//              }              

//     console.log(allData)

//      res.render("search",{allData:allData})
//   }


// });

// Implement the search function
app.get('/search', async (req, res) => {

  if(req.query.user != undefined && req.query.user !=""){    

     if("24Chicken" == req.query.user){
      let chicken = await Chicken.find({}).lean();
      if(chicken != null && chicken !=""){
        res.redirect('/24Chicken');    
       }
     }else{    
      let chicken = await Chicken.find({$or:[{title : {$regex: new RegExp(req.query.user, 'i')}},{content : {$regex: new RegExp(req.query.user, 'i')}}], }).lean();
         if(chicken != null && chicken !=""){
           res.redirect('/24Chicken');
            
           }
         }

     if("El Poco Cantina" == req.query.user){
      let store = await Store.find({}).lean();
      if(store != null && store !=""){
         res.redirect('/store');
        }
     }else{    
      let store = await Store.find({$or:[{title : {$regex: new RegExp(req.query.user, 'i')}},{content : {$regex: new RegExp(req.query.user, 'i')}}], }).lean();
         if(store != null && store !=""){
          res.redirect('/store');  
        }
       }

    if("Obscure Cafe" == req.query.user){
      let cafe = await Cafe.find({}).lean();
      if(cafe != null && cafe !=""){
         res.redirect('/ObscureCafe');      
        }
     }else{    
      let cafe = await Cafe.find({$or:[{title : {$regex: new RegExp(req.query.user, 'i')}},{content : {$regex: new RegExp(req.query.user, 'i')}}], }).lean();
         if(cafe != null && cafe !=""){
          res.redirect('/ObscureCafe');  
        }
       }


    if("Everything But Cheese" == req.query.user){
      let cheese = await Cheese.find({}).lean();
      if(cheese != null && cheese !=""){
         res.redirect('/EverythingButCheese');
           
        }
     }else{    
      let cheese = await Cheese.find({$or:[{title : {$regex: new RegExp(req.query.user, 'i')}},{content : {$regex: new RegExp(req.query.user, 'i')}}], }).lean();
         if(cheese != null && cheese !=""){
           res.redirect('/EverythingButCheese');
            
           }
         }             
      }   

});


module.exports = app;