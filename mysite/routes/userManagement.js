var express = require('express');
var router = express.Router();
const usersFileBl = require('../models/usersfileBL')
const permissionsFileBl = require('../models/permissionsFileBL')
const usersBl = require('../models/userBL')

router.get('/:id', async function(req, res, next) 
{
    let usersFile = await usersFileBl.getUsers()
    let permissionsFile = await permissionsFileBl.getPermissions()
    res.render('usersManagement',{users : usersFile, userId : req.params.id, perms : permissionsFile})
});

  router.get('/addUser/:id',function(req,res,next)
  {
    res.render('addUser',{userId : req.params.id})
  })

  router.post('/addUser/:id',function(req,res,next)
  {
    res.render('addUser',{userId : req.params.id})
  })


  router.post('/add/:id',async function(req,res,next)
  { 
    var inputValue = req.body.vote;
    if(inputValue=="Save")
    {
    let newUser = {userName : req.body.userName}
     
    let userId = await usersBl.addUser(newUser)

    let newUserFile = {id : userId,
    UserName : req.body.userName,
    FirstName : req.body.firstName,
    LastName : req.body.lastName,
    CreatedDate : req.body.createdDate,
    SessionTimeOut : parseInt(req.body.sessionTimeout)}

    
    let usersFile = await usersFileBl.getUsers()

    usersFile.push(newUserFile)

    let status = await usersFileBl.addUser(usersFile)

    let perms =[]

    if(req.body.viewSub=='on')

    {
      perms.push('ViewSubscriptions')
    }

    if(req.body.createSub=='on')

    {
      perms.push('CreateSubscriptions')
    }

    if(req.body.deleteSub=='on')

    {
      perms.push('DeleteSubscriptions')
    }

    if(req.body.viewMovs=='on')

    {
      perms.push('ViewMovies')
    }

    if(req.body.createMovs=='on')

    {
      perms.push('CreateMovies')
    }

    if(req.body.deleteMovs=='on')

    {
      perms.push('DeleteMovies')
    }

    if(req.body.updateMovs=='on')

    {
      perms.push('UpdateMovies')
    }

    let permsFile = await permissionsFileBl.getPermissions()

    let newObj = {id : userId, permissions : perms}

    permsFile.push(newObj)

    let state = await permissionsFileBl.addPermission(permsFile)

    res.redirect('/UserManagement/' + req.params.id)
  }

  else 
  {
    res.redirect('/UserManagement/' + req.params.id)
  }

  })


  router.post('/editUserData/:id',async function(req,res,next)
  { 
    var inputValue = req.body.vote;

    if(inputValue=="Edit")
    { 
     let usersFile = await usersFileBl.getUsers()
     let permissionsFile = await permissionsFileBl.getPermissions()
     let use = usersFile.find(x=>x.id==req.params.id)
     let perm= permissionsFile.find(x=>x.id==req.params.id)
     res.render('editUser',{user : use, perms: perm})
    }

    else 
    {
      let usersFile = await usersFileBl.getUsers()
      let index= usersFile.findIndex(x=>x.id==req.params.id)
      usersFile.splice(index,1)
      let status = await usersFileBl.addUser(usersFile)
 
      let permissionsFile = await permissionsFileBl.getPermissions()
      let indexPerm = permissionsFile.findIndex(x=>x.id==req.params.id)
      permissionsFile.splice(indexPerm,1)
      let statusPerm = await permissionsFileBl.addPermission(permissionsFile)
      permissionsFile.splice(indexPerm,1)
    
      res.redirect('/UserManagement/' + req.params.id)
    }
    
  })

  router.post('/update/:id',async function(req,res,next)
  { 
    var inputValue = req.body.vote;

    if(inputValue=="Update")
    { 
    let usersFile = await usersFileBl.getUsers()
    
    let index= usersFile.findIndex(x=>x.id==req.params.id)

    usersFile.splice(index,1)

    let objUser = {id: req.params.id, UserName: req.body.userName, 
      FirstName : req.body.firstName, LastName : req.body.lastName, 
      CreatedDate : req.body.createdDate, 
      SessionTimeOut : parseInt(req.body.sessionTimeout)}
  
    usersFile.push(objUser)

    let status = await usersFileBl.addUser(usersFile)

    let permissionsFile = await permissionsFileBl.getPermissions()

    let indexPerm = permissionsFile.findIndex(x=>x.id==req.params.id)

    permissionsFile.splice(indexPerm,1)

    let perms =[]

    if(req.body.viewSub=='on')

    {
      perms.push('ViewSubscriptions')
    }

    if(req.body.createSub=='on')

    {
      perms.push('CreateSubscriptions')
    }

    if(req.body.deleteSub=='on')

    {
      perms.push('DeleteSubscriptions')
    }

    if(req.body.viewMovs=='on')

    {
      perms.push('ViewMovies')
    }

    if(req.body.createMovs=='on')

    {
      perms.push('CreateMovies')
    }

    if(req.body.deleteMovs=='on')

    {
      perms.push('DeleteMovies')
    }

    if(req.body.updateMovs=='on')

    {
      perms.push('UpdateMovies')
    }

    let objPerm = {id: req.params.id, permissions : perms }

    permissionsFile.push(objPerm)

    let state = await permissionsFileBl.addPermission(permissionsFile)

    res.redirect('/UserManagement/' + req.params.id)
  }
  else 
  {
    res.redirect('/UserManagement/' + req.params.id)
  }
  })


  

  module.exports = router;