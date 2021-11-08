var express = require('express');
var router = express.Router();
const userBl = require('../models/userBL')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { msg: ''});
});

router.post('/getuserdata', async function (req, res, next) {
  let userData = req.body
  console.log(userData.username)
  let users = await userBl.getAllUsers()
  let user = users.find(x=>x.UserName == userData.username && x.Password == userData.password)
  if(user)
  {
    let id = user._id
    console.log("login successfully")
    res.redirect("/MainPage/"+ id)
  }

else 
{ 
  res.render('login',{msg : 'error'})
  
}

})

router.get('/CreateAccount', function(req, res, next) {
  res.render('createAccount', {msg : ""});
});

router.post('/getNewUserdata', async function(req, res, next) {

  let userData = req.body
  let users = await userBl.getAllUsers()
  let user = users.find(x=>x.UserName == userData.username && x.Password == null)

  if(user)
  {
    let id = user._id
    let obj ={UserName : userData.username, Password : userData.password }
    let status = await userBl.updateUser(id,obj)
    res.redirect("/MainPage/"+ id)

  }

  else {res.render('createAccount',{msg : 'error'})}
  
});

module.exports = router;
