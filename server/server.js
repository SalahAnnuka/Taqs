const express = require('express');
const request = require('request');
const app = express();


app.get('/Result/:city', function(req,res){
    var result = '';
    var apireq = `https://api.openweathermap.org/data/2.5/weather?q=${req.params.city}&units=metric&appid=b5331a7dcbc34c05a7cab530bc441d05`;
    console.log(apireq);
    request(apireq, function (error, response, body) {
        if (response.statusCode === 200)
        {
            result = JSON.parse(body);
            res.json(result);
        }
        else {
            console.error('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        }
    });
});


app.get('/',function(req,res){
    res.send('Server Start.');
});

var server = app.listen(7777,function(){
    var port = server.address().port;
    console.log('Server is listening at port ' + port);
});