const express = require('express');
const app = express();
const { Chicken } = require('../models/24chicken')
const { Cheese } = require('../models/everythingbutcheese')
const { Gang } = require('../models/ganggangstore')
const { Cafe } = require('../models/obscurecafe')
const { Store } = require('../models/store')


const{ Profile }= require("../models/Profile");
const fs = require('fs')

app.get('/', async (req, res) => {
	let data = await Store.find({ });
    let profile = await Profile.findOne({"username":req.session.username });

    var pushData = [];

    data.forEach((rev) => {
      let star1 = [];
      let emptyStar1 = [];
      let reviewData = [];

      for (var i = 1; i <= rev.rating; i++ ) {
         star1.push(i)
      }
      for (var i = star1.length + 1; i <= 5; i++ ) {
         emptyStar1.push(i)
      }
      if(rev.reviews !== []){
        for (var i = 0; i <= rev.reviews.length; i++ ) {
          if(rev.reviews[i] !== undefined){
           if(rev.reviews[i]?.username == profile?.username){            
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
      if(rev.username == profile?.username){
         img = profile.image
      }else{
        img = rev.image
      }

      const paragraph = rev.content;
      const countParagraphTextLength = (paragraph) => {
      let paragraphLength = 0;
      for (let character of paragraph) {
        if (character != '\n') {
          paragraphLength += 1;
        }
      }
      return paragraphLength;
     };
     const paragraphLength = countParagraphTextLength(paragraph);
      
      var storeData = {
        id:rev._id,
        content:rev.content,
        paragraphLength:paragraphLength > 400,
        likes:rev.likes,
        dislikes:rev.dislikes,
        username:rev.username,
        rating:rev.rating,
        image:img,
        title:rev.title,
        star1:star1,
        emptyStar1:emptyStar1,
        reviewss:reviewData,
        commentFile:rev.commentFile,
      }
       pushData.push(storeData)


    });

    if (req.session.username) {
        res.render('store', { user: req.session.username,data:pushData,profile:profile });
    } 
    else {
        res.render('store');
    }
});

app.post('/add/store-review',async(req, res) => {
  const { replay, commentId } = req.body;
  let store = await Store.findOne({_id:req.body.commentId });
  let profile = await Profile.findOne({username:req.session.username });


    //console.log(req.body);
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
       image : profile ? profile?.image : "",
       uploadImage:imagePath,
       likes:[],
       dilikes:[]
    }

    store.reviews.push(data)


    store.save().then(check =>{
    res.redirect('/store');
 
  });
   

});

// Route to handle comment submission
app.post('/storesubmit_comment', async (req, res) => {
    const username = req.session.username;
    const token = req.session.token
    let content = req.body.comment;
    let rating = req.body.rating;
    const title = req.body.postTitle


    let profile = await Profile.findOne({"username":req.session.username });
    let image = profile.image;
      //console.log(req.body);
      if (req.files && req.files.image) {
        let dir = './public/uploads/comment/';
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
    var commentFile = imagePath;  
  

    let store = await new Store({
        username, token, content,image,commentFile,rating, title
    });

    store = await store.save();
    console.log(store)
    res.redirect('/store');
});

app.get('/edit/:id', async (req, res) => {
    let getStore = await Store.findOne({_id:req.params.id});
    if(getStore.username != req.session.username){
        res.redirect('/store');     
    }
  
    res.render('edit1',{getStore:getStore});
});

app.post('/edit/:id', async (req, res) => {
    let getStore = await Store.findOne({_id:req.params.id});

       getStore.content = req.body.comment;

       getStore.save();
  
    res.render('edit1',{getStore:getStore});
});

app.get('/delete/:id', async (req, res) => {
    let getStore = await Store.findOne({_id:req.params.id});

    if(getStore.username != req.session.username){
        res.redirect('/store');     
    }else{
        let chicken = await Store.deleteOne({_id:req.params.id});

       res.redirect('/store');
    }
   
});

app.post('/like/:id', async (req, res) => {
    const username = req.session.username;
    const token = req.session.token

    let getStore = await Store.findOne({_id:req.params.id});
    if(getStore?.likes[0]?.user == username){
       res.redirect('/store');
    }else if(getStore?.dislikes[0]?.user == username){
       res.redirect('/store');
    }else{
     var like = {
        user:username
    }
    
    getStore.likes.push(like)

    chicken = await getStore.save();
    res.redirect('/store')
    }
});

app.post('/dislike/:id', async (req, res) => {
    const username = req.session.username;
    const token = req.session.token

    let getStore = await Store.findOne({_id:req.params.id});
    if(getStore?.dislikes[0]?.user == username){
       res.redirect('/store');
    }if(getStore?.likes[0]?.user == username){
       res.redirect('/store');
    }else{
     var dislike = {
        user:username
    }
    
    getStore.dislikes.push(dislike)

    chicken = await getStore.save();
    res.redirect('/store')
    }
});


app.get('/view/:id', async (req, res) => {
    let getStore = await Store.findOne({_id:req.params.id});
  
    res.render('view2',{getStore:getStore});
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


app.get('/views-store/:review', async (req, res) => {
    let getStore = await Store.find({});
    
    getStores = []
    for (var i = 0; i <= getStore.length; i++){
    const exists = getStore[i]?.reviews?.find(
        (address) => address.review === req.params.review
      );
    if(exists !=undefined){
      getStores.push(exists)
    }
  }

    res.render('view44',{getChicken:getStores[0]});
});



module.exports = app;