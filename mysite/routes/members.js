
var express = require('express');
var router = express.Router();
let membersBl = require('../models/membersBl')
let permissionsBl = require('../models/permissionsFileBL')
let subscriptionsBL = require('../models/susbscriptionsBL')
let moviesBl = require('../models/moviesBl')

/* GET home page. */
router.get('/:id', async function(req, res, next) {

  let permsdata = await permissionsBl.getPermissions()
  let obj = permsdata.find(x=>x.id==req.params.id)
  let permissions = obj.permissions
  let dataMembers = await membersBl.getAllMembers()
  let dataSubscriptions = await subscriptionsBL.getAllSubscriptions()
  let movies = await moviesBl.getAllMovies()
  let subs =[]
 
  // create a new array with includes all subscriptions which include the name of movies are belong them and send it to the membersview
  
  dataSubscriptions.forEach(sub => {

    let moviesName = []

    for (let i = 0; i < sub.Movies.length; i++) {

      let mov = movies.find(x=>x._id==sub.Movies[i].movieId)
      let nameOfMove = mov.Name  
      let newMovie = {MovieName : nameOfMove, date : sub.Movies[i].date}
      moviesName.push(newMovie)
     
    }

    let newSub = {MemberId : sub.MemberId , Movies: moviesName}
    subs.push(newSub)
    
  });

              
     
    res.render('members', {members : dataMembers,userId : req.params.id, perms : permissions, subscriptions : subs, moviesName : movies });
  });

  

  router.post('/editMember/:userid/:memberid',async function(req,res,next)
  {
     
    var inputValue = req.body.vote;

    if(inputValue=="Edit")

    {
    
    let data = await membersBl.getMember(req.params.memberid)

    res.render('editMember',{member : data, userId : req.params.userid})
    }

    else //delete the member
    {
      let data = await membersBl.deleteMember(req.params.memberid)

      res.redirect('/Subscriptions/' + req.params.userid)
    }

  })

  router.post('/member/update/:memberid/:userid',async function(req,res,next)
  {

    let obj = {name : req.body.Name, email : req.body.Email, city : req.body.City}

    let status = await membersBl.updateMember(req.params.memberid,obj)
    res.redirect('/Subscriptions/'+ req.params.userid)

  })

  router.post('/addSubscription/:memberid/:userid',async function(req,res,next)
  {
    
   let data = await subscriptionsBL.getAllSubscriptions()
   let sub = data.find(x=>x.MemberId==req.params.memberid)
   
   if(sub)

   {
   let subId = sub._id
   let moviesSub = sub.Movies
   let dataMov = await moviesBl.getAllMovies()
   let nameMov = req.body.name
   let movieMatch = dataMov.find(x=>x.Name==nameMov)
   let movId = movieMatch._id
   moviesSub.push({movieId:movId,date:req.body.date})
   let obj ={memberId: req.params.memberid, movies : moviesSub}
   let status= await subscriptionsBL.updateSubscriptions(subId,obj)
   res.redirect('/Subscriptions/'+ req.params.userid)

   }

   else
   {
    let dataMov = await moviesBl.getAllMovies()
    let nameMov = req.body.name
    let movieMatch = dataMov.find(x=>x.Name==nameMov)
    let movId = movieMatch._id
    let newMovies = [{movieId : movId, date : req.body.date}]
    let obj ={memberId : req.params.memberid,movies : newMovies}
    let status= await subscriptionsBL.addSubscripton(obj)
    res.redirect('/Subscriptions/'+ req.params.userid)
   }
  })
  
   router.post('/addMember/:userid',async function(req,res,next)
   {
    res.render('addMember',{userId : req.params.userid})
          
   })

   router.post('/add/:id',async function(req,res,next)
   {
    var inputValue = req.body.vote;
    if(inputValue=="Save")
    {
    let obj = {name : req.body.Name, email : req.body.Email, city : req.body.City}

    let status = await membersBl.addMember(obj)   
    
    res.redirect('/Subscriptions/' + req.params.id)
    }

    else res.redirect('/Subscriptions/' + req.params.id)

   })
   
module.exports = router;

