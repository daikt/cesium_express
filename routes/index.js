var express = require('express');
var router = express.Router();

var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {

  // get png-file name list.
  fs.readdir("public/images/", function(err, files) {
    if (err) throw err;
    res.render('index', {
      title: 'Kinugawa innundation sample on Cesium',
      fileNameList: files
    });
  });

});

module.exports = router;
