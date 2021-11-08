const express = require('express');
const router = express.Router();
const subscriptionsBl = require('../models/subscriptionsBl')


router.route('/')
    .get(async (req,resp) =>
    {
          let data = await subscriptionsBl.getAllSubscriptions()
          return  resp.json(data)
    })

    router.route('/')
  .post(async(req,resp)=>
  {
      let status = await subscriptionsBl.addSubscription(req.body)
      return resp.json(status)

  })

  router.route('/:id').put(async(req,resp)=>
  {
    let status = await subscriptionsBl.updateSubscriptions(req.params.id,req.body)
    return resp.json(status)
  })

module.exports = router;