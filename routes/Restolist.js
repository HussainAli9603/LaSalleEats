const express = require('express');
const app = express();
const { Profile } = require('../models/Profile')
const { Chicken } = require('../models/24chicken');
const { Cheese } = require('../models/everythingbutcheese');
const { Store } = require('../models/store');
const { Cafe } = require('../models/obscurecafe');


app.get('/', async(req, res) => {
    var profile = await Profile.findOne({username:req.session.username})
    var chicken = await Chicken.find({})
    var cheese = await Cheese.find({})
    var store = await Store.find({})
    var cafe = await Cafe.find({})
    var chickenLength = chicken.length;
    var cheeseLength = cheese.length;
    var storeLength = store.length;
    var cafeLength = cafe.length;



    let avg = 0;
    chicken.forEach((rev) => {
        avg += rev.rating;
      });
   var totalRating = avg / chicken.length;

   let avg1 = 0;
    cheese.forEach((rev) => {
        avg1 += rev.rating;
      });
   var totalRating1 = avg1 / cheese.length;

   let avg2 = 0;
    store.forEach((rev) => {
        avg2 += rev.rating;
      });
   var totalRating2 = avg2 / store.length;
  
   let avg3 = 0;
    cafe.forEach((rev) => {
        avg3 += rev.rating;
      });
   var totalRating3 = avg3 / cafe.length;

    var star1 = [];
    var emptyStar1 = []
    for (var i = 1; i <= totalRating; i++ ) {
     	star1.push(i)
     }
    for (var i = star1.length + 1; i <= 5; i++ ) {
     	    emptyStar1.push(i)
     }

     var star2 = [];
    var emptyStar2 = []
    for (var i = 1; i <= totalRating1; i++ ) {
     	star2.push(i)
     }
    for (var i = star2.length + 1; i <= 5; i++ ) {
     	    emptyStar2.push(i)
     }

     var star3 = [];
    var emptyStar3 = []
    for (var i = 1; i <= totalRating2; i++ ) {
     	star3.push(i)
     }
    for (var i = star3.length + 1; i <= 5; i++ ) {
     	    emptyStar3.push(i)
     }

     var star4 = [];
    var emptyStar4 = []
    for (var i = 1; i <= totalRating3; i++ ) {
     	star4.push(i)
     }
    for (var i = star4.length + 1; i <= 5; i++ ) {
     	    emptyStar4.push(i)
     }

    if (req.session.username) {
        res.render('restolist', { 
        	user: req.session.username,
        	profile:profile, 
        	chickenLength:chickenLength,
        	cheeseLength:cheeseLength,
        	storeLength:storeLength,
        	cafeLength:cafeLength,
        	totalRating:totalRating,
        	totalRating1:totalRating1,
        	totalRating2:totalRating2,
        	totalRating3:totalRating3,
        	star1:star1,
        	emptyStar1:emptyStar1,
        	star2:star2,
        	emptyStar2:emptyStar2,
        	star3:star3,
        	emptyStar3:emptyStar3,
        	star4:star4,
        	emptyStar4:emptyStar4

         });
    } 
    else {
        res.render('restolist',{
            chickenLength:chickenLength,
            cheeseLength:cheeseLength,
            storeLength:storeLength,
            cafeLength:cafeLength,
            totalRating:totalRating,
            totalRating1:totalRating1,
            totalRating2:totalRating2,
            totalRating3:totalRating3,
            star1:star1,
            emptyStar1:emptyStar1,
            star2:star2,
            emptyStar2:emptyStar2,
            star3:star3,
            emptyStar3:emptyStar3,
            star4:star4,
            emptyStar4:emptyStar4
        });
    }
});

module.exports = app;