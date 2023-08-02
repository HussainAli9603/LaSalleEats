const express = require('express');
const app = express();
const { Chicken } = require('../models/24chicken')
const { Cheese } = require('../models/everythingbutcheese')
const { Gang } = require('../models/ganggangstore')
const { Cafe } = require('../models/obscurecafe')
const { Store } = require('../models/store')
const{ Profile }= require("../models/Profile");
const fs = require('fs');
const objectID = require('mongoose').Types.ObjectId;


app.get('/', async (req, res) => {
    var data = await Chicken.find({});
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
        for (var i = 0; i <= rev?.reviews?.length; i++ ) {
          if(rev.reviews[i] !== undefined){
            reviewData.push(rev.reviews[i])
        }
       }
      }
      
      var chickenData = {
        id:rev.id,
        content:rev.content,
        likes:rev.likes,
        dislikes:rev.dislikes,
        username:rev.username,
        rating:rev.rating,
        image:rev.image,
        title:rev.title,
        star1:star1,
        commentFile:rev.commentFile,
        emptyStar1:emptyStar1,
        reviewss:reviewData,

      }
       pushData.push(chickenData)

    });

    if (req.session.username) {
        res.render('24chicken', { user:req.session.username,
            data:pushData,
            profile:profile,
             });
    } 
    else {
        res.render('24chicken',{
            data:pushData,
        });
    }
});

app.get('/edit/:id', async (req, res) => {
	let getChicken = await Chicken.findOne({_id:req.params.id});
	if(getChicken.username != req.session.username){
        res.redirect('/24chicken');		
	}
    res.render('edit',{getChicken:getChicken});
});


app.get('/edit/review/:review', async (req, res) => {
  let getChicken = await Chicken.find({});
  if(getChicken.username != req.session.username){
        res.redirect('/24chicken');   
  }else{
  var getChickenn = getChicken.filter((data)=> data.reviews);
  console.log(getChickenn)

  var filterChicken = getChickenn.reviews.filter((data)=> data.review)
  console.log(filterChicken)
    
    res.render('reviewedit',{getChicken:getChickenn[0]});
  }
});

app.post('/edit/review/:review', async (req, res) => {
  let getChicken = await Chicken.find({});

  var getChickenn = getChicken.reviews.filter((data)=> data.review == req.param.review)

     // getChickenn[0].review = req.body.comment;

     console.log(getChickenn)

     getChickenn.save();

     console.log(getChickenn)
  
    res.render('reviewedit',{getChicken:getChickenn});
});


app.post('/edit/:id', async (req, res) => {
	let getChicken = await Chicken.findOne({_id:req.params.id});

	   getChicken.content = req.body.comment;

	   getChicken.save();

	   console.log(getChicken)
  
    res.render('edit',{getChicken:getChicken});
});


app.get('/delete/:id', async (req, res) => {
	let getChicken = await Chicken.findOne({_id:req.params.id});

	if(getChicken.username != req.session.username){
        res.redirect('/24chicken');		
	}else{
		let chicken = await Chicken.deleteOne({_id:req.params.id});

       res.redirect('/24Chicken');
	}
   
});

app.post('/24submit_comment', async (req, res) => {
    const username = req.session.username;
    const token = req.session.token
    let title = req.body.postTitle
    let content = req.body.comment;
    let rating = req.body.rating;
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

    var chicken = await Chicken.find({})

    var commentFile = imagePath;
    let chicken1 = await new Chicken({
        username, token, content, image, commentFile, rating, title
    });

    chicken11 = await chicken1.save();
    console.log(chicken11)
    res.redirect('/24Chicken');
});

app.post('/like/:id', async (req, res) => {
    const username = req.session.username;
    const token = req.session.token

	let getChicken = await Chicken.findOne({_id:req.params.id});
	if(getChicken?.likes[0]?.user == username){
       res.redirect('/24Chicken');
	}else if (getChicken?.dislikes[0]?.user == username) {
       res.redirect('/24Chicken');
  }else{
     var like = {
		user:username
	}
    
    getChicken.likes.push(like)

    chicken = await getChicken.save();
    res.redirect('/24Chicken')
	}
});

app.post('/dislike/:id', async (req, res) => {
    const username = req.session.username;
    const token = req.session.token

	let getChicken = await Chicken.findOne({_id:req.params.id});
	if(getChicken?.dislikes[0]?.user == username){
       res.redirect('/24Chicken');
	}else if (getChicken?.likes[0]?.user == username) {
       res.redirect('/24Chicken');
  }else{
     var dislike = {
		user:username
	}
    
    getChicken.dislikes.push(dislike)

    chicken = await getChicken.save();
    res.redirect('/24Chicken')
	}
});

app.get('/view/:id', async (req, res) => {
    let getChicken = await Chicken.findOne({_id:req.params.id});
    if(getChicken.username != req.session.username){
        res.redirect('/24chicken');     
    }
    res.render('view',{getChicken:getChicken});
});


app.get('/views/:review', async (req, res) => {
    let getChicken = await Chicken.find({});
    if(getChicken.username != req.session.username){
        res.redirect('/24chicken');     
    }
    getChickens = []
    for (var i = 0; i <= getChicken.length; i++){
    const exists = getChicken[i]?.reviews?.find(
        (address) => address.review === req.params.review
      );
    if(exists !=undefined){
      getChickens.push(exists)
    }
  }

    res.render('view44',{getChicken:getChickens[0]});
});


app.post('/add/user-review',async(req, res) => {
  const { replay, commentId } = req.body;
  let chicken = await Chicken.findOne({_id:req.body.commentId });

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
       username : chicken.username,
       image : chicken.image,
       uploadImage:imagePath,
       likes:[],
       dilikes:[]
    }

    chicken.reviews.push(data)


    chicken.save().then(check =>{
    res.redirect('/24chicken');
 
  });
   

});


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


//      res.render("search",{allData:allData})
//   }


// });

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







