const express = require('express');
const auth = require('../middleware/auth');
const app = express();
const{ Profile }= require("../models/Profile");
const { Chicken } = require('../models/24chicken')
const { Cheese } = require('../models/everythingbutcheese')
const { Gang } = require('../models/ganggangstore')
const { Cafe } = require('../models/obscurecafe')
const { Store } = require('../models/store')
const fs = require('fs')
const {ObjectID} = require('mongodb');

app.get('/', async (req, res) => {
    // Retrieve the username from the session data
    const username = req.session.username;
    if (!username) {
      return res.redirect('/login'); // Replace '/login' with your actual login route
    }
      let profile = await Profile.findOne({username:req.session.username });
      let chicken = await Chicken.find({username:req.session.username });
      let store = await Store.find({username:req.session.username });
      let cheese = await Cheese.find({username:req.session.username });
      let cafe = await Cafe.find({username:req.session.username });

      var pushData = [];

    chicken.forEach((rev) => {
      let star1 = [];
      let emptyStar1 = []
      let reviewData = []
      for (var i = 1; i <= rev.rating; i++ ) {
         star1.push(i)
      }
      for (var i = star1.length + 1; i <= 5; i++ ) {
         emptyStar1.push(i)
      }
      if(rev.reviews !== []){
        for (var i = 0; i <= rev.reviews.length; i++ ) {
          if(rev.reviews[i] !== undefined){
           if(rev.reviews[i].username == profile.username){            
             var data1 = {
                review:rev.reviews[i].review,
                username:rev.reviews[i].username,
                image:profile.image,

             } 
             reviewData.push(data1)
           }else{
            var data2 = {
                review:rev.reviews[i].review,
                username:rev.reviews[i].username,
                image:rev.reviews[i].image,

             } 
             reviewData.push(data2)
           }
        }
       }
      }

      var img;
      if(rev.username == profile.username){
         img = profile.image
      }else{
        img = rev.image
      }
      var chickenData = {
        id:rev._id,
        content:rev.content,
        likes:rev.likes,
        dislikes:rev.dislikes,
        username:rev.username,
        rating:rev.rating,
        title:rev.title,
        image:img,
        star1:star1,
        emptyStar1:emptyStar1,
        reviewss:reviewData,
        profile:profile
      }
       pushData.push(chickenData)
    });

    store.forEach((rev) => {
      let star1 = [];
      let emptyStar1 = []
      let reviewData = []
      for (var i = 1; i <= rev.rating; i++ ) {
         star1.push(i)
      }
      for (var i = star1.length + 1; i <= 5; i++ ) {
         emptyStar1.push(i)
      }
       if(rev.reviews !== []){
        for (var i = 0; i <= rev.reviews.length; i++ ) {
          if(rev.reviews[i] !== undefined){
           if(rev.reviews[i].username == profile.username){            
             var data1 = {
                review:rev.reviews[i].review,
                username:rev.reviews[i].username,
                image:profile.image,

             } 
             reviewData.push(data1)
           }else{
            var data2 = {
                review:rev.reviews[i].review,
                username:rev.reviews[i].username,
                image:rev.reviews[i].image,

             } 
             reviewData.push(data2)
           }
        }
       }
      }
      var img;
      if(rev.username == profile.username){
         img = profile.image
      }else{
        img = rev.image
      }
      var storeData = {
        id:rev._id,
        content:rev.content,
        likes:rev.likes,
        dislikes:rev.dislikes,
        username:rev.username,
        rating:rev.rating,
        title:rev.title,
        image:img,
        star1:star1,
        emptyStar1:emptyStar1,
        reviewss:reviewData,
        profile:profile
      }
       pushData.push(storeData)
    });

    cheese.forEach((rev) => {
      let star1 = [];
      let emptyStar1 = []
      let reviewData = []
      for (var i = 1; i <= rev.rating; i++ ) {
         star1.push(i)
      }
      for (var i = star1.length + 1; i <= 5; i++ ) {
         emptyStar1.push(i)
      }
       if(rev.reviews !== []){
        for (var i = 0; i <= rev.reviews.length; i++ ) {
          if(rev.reviews[i] !== undefined){
           if(rev.reviews[i].username == profile.username){            
             var data1 = {
                review:rev.reviews[i].review,
                username:rev.reviews[i].username,
                image:profile.image,

             } 
             reviewData.push(data1)
           }else{
            var data2 = {
                review:rev.reviews[i].review,
                username:rev.reviews[i].username,
                image:rev.reviews[i].image,

             } 
             reviewData.push(data2)
           }
        }
       }
      }
       var img;
      if(rev.username == profile.username){
         img = profile.image
      }else{
        img = rev.image
      }
      var cheeseData = {
        id:rev._id,
        content:rev.content,
        likes:rev.likes,
        dislikes:rev.dislikes,
        username:rev.username,
        rating:rev.rating,
        title:rev.title,
        image:img,
        star1:star1,
        emptyStar1:emptyStar1,
        reviewss:reviewData,
        profile:profile
      }
       pushData.push(cheeseData)
    });

    cafe.forEach((rev) => {
      let star1 = [];
      let emptyStar1 = []
      let reviewData = []
      for (var i = 1; i <= rev.rating; i++ ) {
         star1.push(i)
      }
      for (var i = star1.length + 1; i <= 5; i++ ) {
         emptyStar1.push(i)
      }
       if(rev.reviews !== []){
        for (var i = 0; i <= rev.reviews.length; i++ ) {
          if(rev.reviews[i] !== undefined){
           if(rev.reviews[i].username == profile.username){            
             var data1 = {
                review:rev.reviews[i].review,
                username:rev.reviews[i].username,
                image:profile.image,

             } 
             reviewData.push(data1)
           }else{
            var data2 = {
                review:rev.reviews[i].review,
                username:rev.reviews[i].username,
                image:rev.reviews[i].image,

             } 
             reviewData.push(data2)
           }
        }
       }
      }
      var img;
      if(rev.username == profile.username){
         img = profile.image
      }else{
        img = rev.image
      }
      var cafeData = {
        id:rev._id,
        content:rev.content,
        likes:rev.likes,
        dislikes:rev.dislikes,
        username:rev.username,
        rating:rev.rating,
        title:rev.title,
        image:img,
        star1:star1,
        emptyStar1:emptyStar1,
        reviewss:reviewData,
        profile:profile
      }
       pushData.push(cafeData)
    });

     const chickenLikes = chicken.filter(object => object?.likes[0]?.user == req.session.username);
     const storeLikes   = store.filter(object => object?.likes[0]?.user == req.session.username);
     const cheeseLikes  = cheese.filter(object => object?.likes[0]?.user == req.session.username);
     const cafeLikes    = cafe.filter(object => object?.likes[0]?.user == req.session.username);
     var allLikes = chickenLikes.length + storeLikes.length + cheeseLikes.length + cafeLikes.length;
    
     const chickenComments = chicken?.length;
     const cafeComments = cafe?.length;
     const cheeseComments = cheese?.length;
     const storeComments = store?.length;
     const commentlength = chicken?.length + cafe?.length + cheese?.length + store?.length;
     // console.log(commentlength)

     var pushData1 = pushData.slice(0, 3);
     var pushData2 = pushData.slice(3, 10);
     // console.log(pushData1)

      if(profile){
        // Render the User page and pass the username to it
        res.render('User', {
          user: username, 
          profile:profile,
          chicken:pushData1,
          chicken2:pushData2,
          chickenLikes:allLikes,
          commentlength:commentlength
        });      
      }
    // Render the User page and pass the username to it
    res.render('User', {user: username});
});

app.get('/logout', (req, res) => {
  // Destroy the user session
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
    }
    res.redirect('/Homepage');
  });
});

app.post('/edit/user-profile',async(req, res) => {
  const { education, college, profession } = req.body;

      if (!req.session.username) {
       res.render('/', {user: req.session.username});    
      }

      if (req.files && req.files.image) {
        let dir = './public/uploads/';
        if (!fs.existsSync(dir)) {
            await fs.mkdirSync(dir, { recursive: true });
        }

        let profileImage = req.files.image;
        let nowDate = Date.now();
        let iconUrl = dir + nowDate / 1000 + "" + profileImage.name;

        await profileImage.mv(iconUrl, async function (err) {
            if (err)
              console.log(err);
        });

        imagePath = iconUrl.substring(9);
        icon = imagePath;
      }else{
        imagePath = req.body.oldImage
      }
    
      let profile = await Profile.findOne({"username":req.session.username });
      if(!profile){

        res.setHeader('Content-Type', 'application/json');

        const newProfile = new Profile({
          username   :    req.session.username,
          education  :    req.body.education,
          college    :    req.body.college,
          profession :    req.body.profession,
          image      :    imagePath,
        });

        newProfile.save().then(profile =>{
          res.redirect('/User');
 
    });
   }else{
         res.setHeader('Content-Type', 'application/json');

          profile.username   =    req.session.username;
          profile.education  =    education;
          profile.college    =    college;
          profile.profession =    profession;
          profile.image      =    imagePath;

          profile.save().then(profile =>{
             res.redirect('/User');

    });
   }

});


app.post('/edit/user-review',async(req, res) => {
  const { replay, commentId } = req.body;
  let chicken = await Chicken.findOne({_id:req.body.commentId });
  let store = await Store.findOne({_id:req.body.commentId });
  let cheese = await Cheese.findOne({_id:req.body.commentId });
  let cafe = await Cafe.findOne({_id:req.body.commentId });
  let profile = await Profile.findOne({username:req.session.username})
 

  if(chicken){ 
      if (req.files && req.files.image) {
        let dir = './public/uploads/';
        if (!fs.existsSync(dir)) {
            await fs.mkdirSync(dir, { recursive: true });
        }
        let profileImage = req.files.image;
        let nowDate = Date.now();
        let iconUrl = dir + nowDate / 1000 + "" + profileImage.name;

        await profileImage.mv(iconUrl, async function (err) {
            if (err)
                console.log(err);
        });
        imagePath = iconUrl.substring(9);
        icon = imagePath;
      }else{
        imagePath = req.body.oldImage
      }

      var data = {
        id:req.body.commentId,
        review : req.body.replay,
        username : req.session.username,
        image : profile.image,
        uploadImage:imagePath,
        likes:[],
        dilikes:[]
      }
      chicken.reviews.push(data)
      chicken.save().then(check =>{
      res.redirect('/User');
    });
    }else if(store){
       if (req.files && req.files.image) {
        let dir = './public/uploads/';
        if (!fs.existsSync(dir)) {
            await fs.mkdirSync(dir, { recursive: true });
        }
        let profileImage = req.files.image;
        let nowDate = Date.now();
        let iconUrl = dir + nowDate / 1000 + "" + profileImage.name;

        await profileImage.mv(iconUrl, async function (err) {
            if (err)
                console.log(err);
        });
        imagePath = iconUrl.substring(9);
        icon = imagePath;
      }else{
        imagePath = req.body.oldImage
      }
      var data = {
        id:req.body.commentId,
        review : req.body.replay,
        username : req.session.username,
        image : profile.image,
        uploadImage:imagePath,
        likes:[],
        dilikes:[]
      }
      store.reviews.push(data)
      store.save().then(check =>{
      res.redirect('/User');
    });
    }else if(cheese){
       if (req.files && req.files.image) {
        let dir = './public/uploads/';
        if (!fs.existsSync(dir)) {
            await fs.mkdirSync(dir, { recursive: true });
        }
        let profileImage = req.files.image;
        let nowDate = Date.now();
        let iconUrl = dir + nowDate / 1000 + "" + profileImage.name;

        await profileImage.mv(iconUrl, async function (err) {
            if (err)
                console.log(err);
        });
        imagePath = iconUrl.substring(9);
        icon = imagePath;
      }else{
        imagePath = req.body.oldImage
      }
      var data = {
        id:req.body.commentId,
        review : req.body.replay,
        username : req.session.username,
        image : profile.image,
        uploadImage:imagePath,
        likes:[],
        dilikes:[]
      }
      cheese.reviews.push(data)
      cheese.save().then(check =>{
      res.redirect('/User');
    });
    }else if(cafe){
      if (req.files && req.files.image) {
        let dir = './public/uploads/';
        if (!fs.existsSync(dir)) {
            await fs.mkdirSync(dir, { recursive: true });
        }
        let profileImage = req.files.image;
        let nowDate = Date.now();
        let iconUrl = dir + nowDate / 1000 + "" + profileImage.name;

        await profileImage.mv(iconUrl, async function (err) {
            if (err)
                console.log(err);
        });
        imagePath = iconUrl.substring(9);
        icon = imagePath;
      }else{
        imagePath = req.body.oldImage
      }
     
     res.setHeader('Content-Type', 'application/json');

      var data = {
        id:req.body.commentId,
        review : req.body.replay,
        username : req.session.username,
        image : profile.image,
        uploadImage:imagePath,
        likes:[],
        dilikes:[]
      }
      cafe.reviews.push(data)
      cafe.save().then(check =>{
      res.redirect('/User');
    });
    }
   

});

app.get('/readmore', async (req, res) => {
    const username = req.session.username;
    const token = req.session.token

   let getChicken1 = await Chicken.find({username:username}).limit(5);

   let getChicken = await Chicken.find({username:username}).skip(5).limit(5);

   res.redirect('/User',{getChicken1:getChicken1})
  
});

app.post('/like/:id', async (req, res) => {
    const username = req.session.username;
    const token = req.session.token

  let getChicken = await Chicken.findOne({_id:req.params.id});
  let getCheese = await Cheese.findOne({_id:req.params.id});
  let getCafe = await Cafe.findOne({_id:req.params.id});
  let getStore = await Store.findOne({_id:req.params.id});

     res.setHeader('Content-Type', 'application/json');

  
  if(getChicken){
      if(getChicken?.likes[0]?.user == username){
           res.redirect('/User');
      }else if (getChicken?.dislikes[0]?.user == username) {
           res.redirect('/User');
      }else{
         var like = {
        user:username
      }
        getChicken.likes.push(like)
        chicken = await getChicken.save();
        res.redirect('/User')
      }
    }else if(getCheese){
        if(getCheese?.likes[0]?.user == username){
           res.redirect('/User');
        }else if (getCheese?.dislikes[0]?.user == username) {
           res.redirect('/User');
        }else{
          var like = {
         user:username
        }
        getCheese.likes.push(like)
        chicken = await getCheese.save();
        res.redirect('/User')
      }
    }else if(getStore){
        if(getStore?.likes[0]?.user == username){
           res.redirect('/User');
        }else if (getStore?.dislikes[0]?.user == username) {
           res.redirect('/User');
        }else{
          var like = {
         user:username
        }
        getStore.likes.push(like)
        chicken = await getStore.save();
        res.redirect('/User')
      }
    }else if(getCafe){
        if(getCafe?.likes[0]?.user == username){
           res.redirect('/User');
        }else if (getCafe?.dislikes[0]?.user == username) {
           res.redirect('/User');
        }else{
          var like = {
         user:username
        }
        getCafe.likes.push(like)
        chicken = await getCafe.save();
        res.redirect('/User')
      }
    }
});

app.post('/dislikes/:id', async (req, res) => {
    const username = req.session.username;
    const token = req.session.token

  let getChicken = await Chicken.findOne({_id:req.params.id});
  let getCheese = await Cheese.findOne({_id:req.params.id});
  let getCafe = await Cafe.findOne({_id:req.params.id});
  let getStore = await Store.findOne({_id:req.params.id});

     res.setHeader('Content-Type', 'application/json');
    
    if(getChicken){
        if(getChicken?.dislikes[0]?.user == username){
             res.redirect('/User');
        }else if (getChicken?.likes[0]?.user == username) {
             res.redirect('/User');
        }else{
           var dislike = {
          user:username
        }
        getChicken.dislikes.push(dislike)
      }
    chicken = await getChicken.save();
    res.redirect('/User')
  }else if(getCheese){
    if(getCheese?.dislikes[0]?.user == username){
             res.redirect('/User');
        }else if (getCheese?.likes[0]?.user == username) {
             res.redirect('/User');
        }else{
           var dislike = {
          user:username
        }
        getCheese.dislikes.push(dislike)
      }
    chicken = await getCheese.save();
    res.redirect('/User')
  }else if(getStore){
    if(getStore?.dislikes[0]?.user == username){
             res.redirect('/User');
        }else if (getStore?.likes[0]?.user == username) {
             res.redirect('/User');
        }else{
           var dislike = {
          user:username
        }
        getStore.dislikes.push(dislike)
      }
    chicken = await getStore.save();
    res.redirect('/User')
  }else if(getCafe){
    if(getCafe?.dislikes[0]?.user == username){
             res.redirect('/User');
        }else if (getCafe?.likes[0]?.user == username) {
             res.redirect('/User');
        }else{
           var dislike = {
          user:username
        }
        getCafe.dislikes.push(dislike)
      }
    chicken = await getCafe.save();
    res.redirect('/User')
  }
});

app.post('/review-like/:username', async (req, res) => {
    const username = req.session.username;
    const token = req.session.token
    console.log(req.params.username)

  let getChicken = await Chicken.findOne({username:req.params.username});
     res.setHeader('Content-Type', 'application/json');

  
     var like = {
       user:username
      }
    var data = getChicken.reviews;
    data.likes.push(like)

    chicken = await getChicken.save();
    res.redirect('/User')
  
});

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

app.get('/edit/:id', async (req, res) => {
  try{
  let getChicken = await Chicken.findOne({_id:req.params.id});
  let getCheese = await Cheese.findOne({_id:req.params.id});
  let getCafe = await Cafe.findOne({_id:req.params.id});
  let getStore = await Store.findOne({_id:req.params.id});
     res.setHeader('Content-Type', 'application/json');

  if(getChicken){
    res.render('edit',{getChicken:getChicken});
  }else if(getCheese){
    res.render('edit2',{getCheese:getCheese});
  }else if(getCafe){
    res.render('edit3',{getCafe:getCafe});
  }else if(getStore){
    res.render('edit1',{getStore:getStore});
  }
  }catch(error){
    console.log(error)
  }
});

app.post('/edit/:id', async (req, res) => {
  try{
    let getChicken = await Chicken.findOne({_id:req.params.id});
    let getCheese  = await Cheese.findOne({_id:req.params.id});
    let getCafe    = await Cafe.findOne({_id:req.params.id});
    let getStore   = await Store.findOne({_id:req.params.id});
    
     res.setHeader('Content-Type', 'application/json');

    if(getChicken){
      getChicken.content = req.body.comment;
      getChicken.save();
      res.render('edit',{getChicken:getChicken});
    }else if(getCheese){
      getCheese.content = req.body.comment;
      getCheese.save();
      res.render('edit2',{getCheese:getCheese});
    }else if(getCafe){
      getCafe.content = req.body.comment;
      getCafe.save();
      res.render('edit3',{getCafe:getCafe}); 
    }else if(getStore){
      getStore.content = req.body.comment;
      getStore.save();
      res.render('edit1',{getStore:getStore});
    }
  
  }catch(error){
    console.log(error)
  }
});

app.get('/delete/:id', async (req, res) => {
  let chicken   = await Chicken.findOne({_id:req.params.id});
  let getStore = await Store.findOne({_id:req.params.id});
  let getCheese = await Cheese.findOne({_id:req.params.id});
  let getCafe = await Cafe.findOne({_id:req.params.id});

     res.setHeader('Content-Type', 'application/json');
  
  if (chicken){
      let chicken   = await Chicken.deleteOne({_id:req.params.id});
      res.redirect('/User');
  }else if(getStore){
      let getStore  = await Store.deleteOne({_id:req.params.id});
      res.redirect('/User');
  }else if(getCheese){
      let getCheese = await Cheese.deleteOne({_id:req.params.id});
      res.render('/User');
  }else if(getCafe){
      let getCafe   = await Cafe.deleteOne({_id:req.params.id});
      res.redirect('/User');
  }

   
});


  
module.exports = app;


















