var express = require('express');
var router = express.Router();
const moviesBl = require('../models/moviesBl')
const permissionsBl = require('../models/permissionsFileBL')

router.get('/:id/:name', async function(req, res, next) {

  let show = '1';

  if(req.params.name!='all')
  {
     show = req.params.name
  }
    let data = await moviesBl.getAllMovies()
    let permsdata = await permissionsBl.getPermissions()
    let obj = permsdata.find(x=>x.id==req.params.id)
    let permissions = obj.permissions
    res.render('movies',{movies : data, userId : req.params.id, perms : permissions, nameMov : show})
  });

 
  router.post('/editMovie/:userid/:movieid',async function(req,res,next)
  { 
    var inputValue = req.body.vote;

    if(inputValue=="Edit")

    {

    let data = await moviesBl.getMovie(req.params.movieid)

    res.render('editMovie',{movie : data, userId : req.params.userid})
    }
    else 
    
    {let data = await moviesBl.deleteMovie(req.params.movieid)

    res.redirect('/Movies/' + req.params.userid+ '/all')}

  })

  router.post('/addMovie/:id',function(req,res,next)
  {
    res.render('addMovie',{userId : req.params.id})

  })

  router.post('/add/:id', async function(req,res,next)
  { var inputValue = req.body.vote;

    if(inputValue=="Save")

    {
    let obj = {name : req.body.Name, genres : req.body.Genres, 
               image : req.body.Image, premiered : req.body.Premiered}

    let status = await moviesBl.addMovie(obj)     
    
    res.redirect('/Movies/' + req.params.id+ '/all')
    }
    else res.redirect('/Movies/' + req.params.id + '/all')

  })

  router.post('/update/:movieid/:userid',async function(req,res,next)
  {

    let obj = {name : req.body.Name, genres : req.body.Genres, 
      image : req.body.Image, premiered : req.body.Premiered}

    let status = await moviesBl.updateMovie(req.params.movieid,obj)
    res.redirect('/Movies/'+ req.params.userid)

  })

module.exports = router;