const express = require('express');
const membersBL = require('../models/membersBl')
const router = express.Router();


router.route('/')
    .get(async (req,resp) =>
    {
    
      let count = await membersBL.countdocuments()

      // if the db is empty load the movies from the https://api.tvmaze.com/shows adress to the db and return the movies

      if(count==0)

      {
        let data = await membersBL.loadMembersfromExternDataSource() 
        return  resp.json(data)  
      }

    else //return movies from the db 

    {
      let data = await membersBL.getAllMembers()
      return  resp.json(data)
    }
    
  })

//get movie by id
router.route('/:id')
.get(async (req,resp) =>
{
      let data = await membersBL.getMember(req.params.id)
      return resp.json(data)
  
})


router.route('/')
.post(async(req,resp)=>
{
let status = await membersBL.addMember(req.body)
return resp.json(status)
})


router.route('/:id')
.put(async(req,resp)=>
{
let status = await membersBL.updateMember(req.params.id,req.body)
return resp.json(status)
})

//router delete
router.route('/:id')
.delete(async(req,resp)=>
{
  let status = await membersBL.deleteMember(req.params.id)
  return resp.json(status)

})

module.exports = router;
