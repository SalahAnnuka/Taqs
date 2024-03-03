const express = require('express');
const request = require('request');
const app = express();

const cors = require('cors');

const fs = require('fs');

const bodyParser = require('body-parser');

// Enable CORS with specific options
app.use(cors());
// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Route to check if username or email exists
app.post('/checkUser', (req, res) => {
    const { username, email } = req.body;

    // Check if username exists
    const usernameExists = database.some(user => user.username === username);
    
    // Check if email exists
    const emailExists = database.some(user => user.email === email);

    res.json({ usernameExists, emailExists });
});

app.get('/Result/:country/:city', function(req,res){
    var result = '';
    var apireq = `https://api.openweathermap.org/data/2.5/weather?q=${req.params.city},${req.params.country}&units=metric&appid=b5331a7dcbc34c05a7cab530bc441d05`;
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


app.get('/MiniData/:query', function(req, res) {
    // Read the JSON file
    fs.readFile('./cities500.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).json({ error: 'Error reading file' });
            return;
        }
        
        // Parse the JSON data
        try {
            const qresults = JSON.parse(data);
            // Filter the data based on the search query
            const filteredData = qresults.filter(city => {
                const cityName = city.name.toLowerCase();
                const query = req.params.query.toLowerCase();
                return cityName.includes(query);
            });

            res.json(filteredData);
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
            res.status(500).json({ error: 'Error parsing JSON' });
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