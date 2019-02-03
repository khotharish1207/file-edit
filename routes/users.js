var express = require("express");
var fs = require("fs");
var router = express.Router();

var contentFile = "./public/content.json";

function readContent() {
  return new Promise(function(resolve, reject) {
    fs.readFile(contentFile, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
}

function createbackUp() {
  return new Promise(function(resolve, reject) {
    readContent()
      .then(function(data) {
        fs.writeFile(getFileName(), data, err => {
          if (err) {
            reject(err);
          }
          resolve("The file has been saved!");
        });
      })
      .catch(reject);
  });
}

function getFileName() {
  return "./public/content_" + Date.now() + ".json";
}

/* GET users listing. */
router.get("/", function(req, res) {
  readContent().then(function(data) {
    res.send(data);
  });
});

router.post("/update", function(req, res) {
  var data = req.body.data;
  createbackUp()
    .then(function(msg) {
      fs.writeFile(contentFile, JSON.stringify(data), err => {
        if (err) {
          res.status(400).status({ error: err });
        }
        console.log("success cb update");

        readContent()
          .then(function(data) {
            res.send(data);
          })
          .catch(function() {
            res.status(400).status({ error: err });
          });
      });
    })
    .catch(function(err) {
      res.status(400).status({ error: err });
    });
});

module.exports = router;
