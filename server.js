'use strict';

var express = require('express');
var cors = require('cors');
var multer = require("multer");
// require and use "multer"...

var app = express();
var upload = multer({dest: "uploads/"});

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

/*
  <form enctype="multipart/form-data" method="POST" action="/api/fileanalyse">
    <input id="inputfield" type="file" name="upfile">
    <input id="button" type="submit" value="Upload">
  </form>
*/

/*

    I can submit a form object that includes a file upload.
    The from file input field has the "name" attribute set to "upfile". We rely on this in testing.
    When I submit something, I will receive the file name, and size in bytes within the JSON response.

*/

app.post('/api/fileanalyse', upload.single("upfile"), function(req, res) {
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
