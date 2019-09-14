let request = require('request');
const http = require("http");
const url = require("url");
const port = process.env.PORT || 2000;
const jsdom = require("jsdom");

http.createServer(function (req, res) {
    const urlStr = req.url.substring(1);
	console.log("Server running on port " + port);
	console.log(`Reqest to: ${urlStr}`);

    request({uri: urlStr}, function(error, response, body){
        if(!error && response.statusCode == 200){
            const {JSDOM} = jsdom;
            const dom = new JSDOM(body);

            var userId = dom.window.document.getElementById('user-id').value;
            console.log(userId);
//            res.write(userId);
            res.end(userId);
        }
    });

}).listen(port, '127.0.0.1', ()=> {
    console.log("server running");
});