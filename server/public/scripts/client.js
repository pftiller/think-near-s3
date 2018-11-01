$(document).ready(function(){
    console.log('all loaded');

// let url = '/apiRouter/api';

let url = '/redshift';

// $.ajax({
//     url: url,
//     type: 'GET',
//     error: function(err){
//         console.log(err);
//     },
//   success: function(data){
//     console.log('here is data', data);
//     $('body').append(data);
//   }
// })


$.ajax({
    url: url,
    type: 'GET',
    error: function(err){
        console.log(err);
    },
  success: function(data){
    console.log('here is data', data);
    $('body').append(data);
  }
})
})