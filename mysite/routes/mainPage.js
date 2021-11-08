var express = require('express');
var router = express.Router();
const permissionsBl = require('../models/permissionsFileBL')

/* GET users listing. */
router.get('/:id', async function(req, res, next) {
  let id = req.params.id
  let management = ""
  if(id=="618901d69d5f15fbc9132155")
  {
     management = true
  }
  let permsdata = await permissionsBl.getPermissions()
  let obj = permsdata.find(x=>x.id==req.params.id)
  let perms = obj.permissions
  res.render('mainPage',{ident : id, manage : management, permissions : perms})
});

router.get('/logout', function(req, res, next) {
  res.render('login',{})
});


module.exports = router;
