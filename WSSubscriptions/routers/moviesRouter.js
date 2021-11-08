const express = require('express');
const moviesBL = require('../models/moviesBl')
const router = express.Router();


//get all movies
router.route('/')
    .get(async (req,resp) =>
    {
    
      let count = await moviesBL.countdocuments()

      // if the db is empty load the movies from the https://api.tvmaze.com/shows adress to the db and return the movies

      if(count==0)

      {
        let data = await moviesBL.loadMoviesfromExternDataSource() 
        return  resp.json(data)  
      }

    else //return movies from the db 

    {
      let data = await moviesBL.getAllMovies()
      return  resp.json(data)
    }
    
  })

  //get movie by id
  router.route('/:id')
    .get(async (req,resp) =>
    {
          let data = await moviesBL.getMovie(req.params.id)
          return resp.json(data)
      
    })

  //add a movie  
  router.route('/')
  .post(async(req,resp)=>
  {
    let status = await moviesBL.addMovie(req.body)
    return resp.json(status)
  })
   
  //update a movie  
  router.route('/:id')
  .put(async(req,resp)=>
  {
    let status = await moviesBL.updateMovie(req.params.id,req.body)
    return resp.json(status)
  })
  router.route('/:id')
  .delete(async(req,resp)=>
  {
    let status = await moviesBL.deleteMovie(req.params.id)
    return resp.json(status)
  })

module.exports = router;


