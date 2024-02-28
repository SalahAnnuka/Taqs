const express = require('express');
const app = express();

let apireq = 'https://api.openweathermap.org/data/2.5/weather?q=Amman&units=metric&appid=b5331a7dcbc34c05a7cab530bc441d05';

app.get('/',function(req,res){
    res.send('Server Start.');
});

var server = app.listen(7777,function(){
    var port = server.address().port;
    console.log('Server is listening at port ' + port);
});