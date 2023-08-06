const express = require('express');
const app = express();
const { Chicken } = require('../models/24chicken')
const { Cheese } = require('../models/everythingbutcheese')
const { Gang } = require('../models/ganggangstore')
const { Cafe } = require('../models/obscurecafe')
const { Store } = require('../models/store')
const{ Profile }= require("../models/Profile");
const fs = require('fs')


app.get('/', async(req, res) => {
	let data = await Cafe.find({ });
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
      
      var cafeData = {
        id:rev._id,
        content:rev.content,
        paragraphLength:paragraphLength > 400,
        likes:rev.likes,
        dislikes:rev.dislikes,
        username:rev.username,
        rating:rev.rating,
        image1:rev.image,
        image:img,
        title:rev.title,
        star1:star1,
        emptyStar1:emptyStar1,
        commentFile:rev.commentFile,
        reviewss:reviewData
      }
       pushData.push(cafeData)


    });

    if (req.session.username) {
        res.render('ObscureCafe', { 
            user: req.session.username,
            data:pushData,
            profile:profile });
    } 
    else {
        res.render('ObscureCafe');
    }
});

app.post('/Cafesubmit_comment', async (req, res) => {
    const username = req.session.username;
    const token = req.session.token
    let content = req.body.comment;
    let rating = req.body.rating;
    const title = req.body.postTitle;


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
 

    let cafe = await new Cafe({
        username, token, content,image,commentFile,rating,title
    });

    cafe = await cafe.save();
    console.log(cafe)
    res.redirect('/ObscureCafe');
});

app.get('/edit/:id', async (req, res) => {
    let getCafe = await Cafe.findOne({_id:req.params.id});
    if(getCafe.username != req.session.username){
        res.redirect('/ObscureCafe');     
    }
  
    res.render('edit3',{getCafe:getCafe});
});

app.post('/edit/:id', async (req, res) => {
    let getCafe = await Cafe.findOne({_id:req.params.id});

       getCafe.content = req.body.comment;

       getCafe.save();
  
    res.render('edit3',{getCafe:getCafe});
});

app.get('/delete/:id', async (req, res) => {
    let getCafe = await Cafe.findOne({_id:req.params.id});

    if(getCafe.username != req.session.username){
        res.redirect('/ObscureCafe');     
    }else{
        let chicken = await Cafe.deleteOne({_id:req.params.id});

       res.redirect('/ObscureCafe');
    }
   
});

app.post('/like/:id', async (req, res) => {
    const username = req.session.username;
    const token = req.session.token

    let getCafe = await Cafe.findOne({_id:req.params.id});
    if(getCafe?.likes[0]?.user == username){
       res.redirect('/ObscureCafe');
    }else if(getCafe?.dislikes[0]?.user == username){
       res.redirect('/ObscureCafe');
    }else{
     var like = {
        user:username
    }
    
    getCafe.likes.push(like)

    chicken = await getCafe.save();
    res.redirect('/ObscureCafe')
    }
});

app.post('/dislike/:id', async (req, res) => {
    const username = req.session.username;
    const token = req.session.token

    let getCafe = await Cafe.findOne({_id:req.params.id});
    if(getCafe?.dislikes[0]?.user == username){
       res.redirect('/ObscureCafe');
    }else if(getCafe?.likes[0]?.user == username){
       res.redirect('/ObscureCafe');
    }else{
     var dislike = {
        user:username
    }
    
    getCafe.dislikes.push(dislike)

    chicken = await getCafe.save();
    res.redirect('/ObscureCafe')
    }
});


app.get('/view/:id', async (req, res) => {
    let getCafe = await Cafe.findOne({_id:req.params.id});
   
    res.render('view3',{getCafe:getCafe});
});


app.post('/add/cafe-review',async(req, res) => {
  const { replay, commentId } = req.body;
  let cafe = await Cafe.findOne({_id:req.body.commentId });
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

    cafe.reviews.push(data)


    cafe.save().then(check =>{
    res.redirect('/ObscureCafe');
 
  });
   

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

app.get('/views-cafe/:review', async (req, res) => {
    let getCafe = await Cafe.find({});
  
    getCafes = []
    for (var i = 0; i <= getCafe.length; i++){
    const exists = getCafe[i]?.reviews?.find(
        (address) => address.review === req.params.review
      );
    if(exists !=undefined){
      getCafes.push(exists)
    }
  }

    res.render('view22',{getChicken:getCafes[0]});
});


module.exports = app;