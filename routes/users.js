var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send({status: 0, data: { list: [] }});
});

module.exports = router;
