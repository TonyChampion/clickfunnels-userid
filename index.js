const port = process.env.PORT || 2000;
const jsdom = require("jsdom");
const request = require('request');
const express = require('express')
const app = express()

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {

  let ret = {
      url : req.query.url
  };

  request({uri: req.query.url}, function(error, response, body){
    ret.error = error;
    ret.responseCode = response.statusCode;

    if(!error && response.statusCode == 200){
        const {JSDOM} = jsdom;
        const dom = new JSDOM(body);

        const userId = dom.window.document.getElementById('user-id').value;
        ret.userId = userId;
    } 

    res.send(JSON.stringify(ret));
});

})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

