//GLOBAL MODULES AND DECLARATIONS
const path = require('path');
const port = 5000;          
//CUSTOM MODULES
const routes = require('./routes/routes');
const bodyParser = require('body-parser');
const {Response} = require('./models/response');
const chalk = require('chalk');
const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);


app.response.success = function(message, data, displayMessage, code){
  console.log(chalk.green(message));
  this
    .status(200)
    .send(Response('success', message, data, displayMessage,code));
}

app.response.error = function(message, data, displayMessage, code){
  console.log(chalk.red(message));
  if(data) {
    console.log(chalk.red(data));
  }
  message = typeof message != 'string' ? 'Something went wrong' : message;
  this
    .status(200)
    .send(Response('error', message, data, displayMessage,code));
}

app.response.unauthorizedUser = function(){
  console.log(chalk.yellow('Unauthorized User'));
  this
    .status(200)
    .send(Response('error', 'Unauthorized User', null, null, 403));
}

app.response.accessDenied = function(){
  console.log(chalk.cyan('Access Denied. Check role of User and RBAC list'));
  this
    .status(200)
    .send(Response('error', 'Access Denied', null, null, 500));
}

app.response.mime = function(readstream){
  readstream.pipe(this);
};

var server = app.listen(port, err => {
  if (err) {
    console.log(chalk.red('Cannot run!'));
  } else {
    console.log(
      chalk.green.bold(
      `
      Yep this is working 🍺
      App listen on port: ${port} 🍕
      Env: Dev 🦄
      `,
      ),
    );
  }
});
