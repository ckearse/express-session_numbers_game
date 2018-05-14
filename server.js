const express = require('express');
const app = express();
const parser = require('body-parser');

var session = require('express-session');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/static'));

app.use(parser.urlencoded({extended: true}));

app.post('/', function(req, res){
  var random_num = 10 * Math.random();
  if(random_num === 0) random_num +=1;
  
  session.number = req.body.guessed_number;

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

app.listen(7777, function(){
  console.log('Express app listening on port 7777');
});