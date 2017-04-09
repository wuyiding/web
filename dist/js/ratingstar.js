/**
 * Created by yangwei on 16/06/16.
 */
// target element
var el = document.querySelector('#el');

// current rating, or initial rating
var currentRating = 0;

// max rating, i.e. number of stars you want
var maxRating= 5;

// callback to run after setting the rating
var callback = function(rating) { alert(rating); };

// rating instance
//var myRating = rating(el, currentRating, maxRating, callback);