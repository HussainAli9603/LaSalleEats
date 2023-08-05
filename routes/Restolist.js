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

     const number1 = totalRating;
     let numberString1 = String(number1);
     let index = numberString1.indexOf(".");
     if (index != -1) {
        numberString1 = numberString1.slice(0, index + 2);
     }
     var result = parseFloat(numberString1);
     
     const number2 = totalRating1;
     let numberString2 = String(number2);
     let index1 = numberString2.indexOf(".");
     if (index1 != -1) {
        numberString2 = numberString2.slice(0, index + 2);
     }
     var result1 = parseFloat(numberString2);
     
     const number3 = totalRating2;
     let numberString3 = String(number3);
     let index2 = numberString3.indexOf(".");
     if (index2 != -1) {
        numberString3 = numberString3.slice(0, index + 2);
     }
     var result2 = parseFloat(numberString3);
     
     const number4 = totalRating3;
     let numberString4 = String(number4);
     let index3 = numberString4.indexOf(".");
     if (index3 != -1) {
        numberString4 = numberString4.slice(0, index + 2);
     }
     var result3 = parseFloat(numberString4);

    if (req.session.username) {
        res.render('restolist', { 
        	user: req.session.username,
        	profile:profile, 
        	chickenLength:chickenLength,
        	cheeseLength:cheeseLength,
        	storeLength:storeLength,
        	cafeLength:cafeLength,
        	totalRating:result,
        	totalRating1:result1,
        	totalRating2:result2,
        	totalRating3:result3,
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
            totalRating:result,
            totalRating1:result1,
            totalRating2:result2,
            totalRating3:result3,
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