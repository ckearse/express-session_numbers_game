const express = require('express');
const app = express();
const parser = require('body-parser');

var session = require('express-session');
session.number = 0;

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/static'));

app.use(parser.urlencoded({extended: true}));

var random_num;

app.post('/', function(req, res){

  if(session.number === 0){
    random_num = Math.floor(100 * Math.random());
    if(random_num === 0) random_num +=1;
  }
  
  session.number = req.body.guessed_number;

  console.log(random_num);

  var result = {
    guess: session.number,
    random: random_num,
    message: [
      {text: 'Too Low!'},
      {text: 'Too High!'},
      {text: ' was the number!'}
    ]
  }

  if(session.number == random_num){
    res.render('win', {'result': result});
  } else{
    res.render('loss', {'result': result});
  }

});

app.post('/reset', function(req, res){
  session.number = 0;

  res.redirect('/');
});

app.listen(7777, function(){
  console.log('Express app listening on port 7777');
});