const port = process.env.PORT || 2000;
const jsdom = require("jsdom");
const request = require('request');
const express = require('express')
const app = express()

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {

  request({uri: req.query.url}, function(error, response, body){
    if(!error && response.statusCode == 200){
        const {JSDOM} = jsdom;
        const dom = new JSDOM(body);

        var userId = dom.window.document.getElementById('user-id').value;
        res.send(userId);
    } else {
        res.send(error);
    }
});

})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

