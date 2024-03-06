const express = require('express');
const request = require('request');
const app = express();
const collection = require("./mongo")
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const cors = require('cors');

const fs = require('fs');


// Enable CORS with specific options
app.use(cors());


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


app.post("/login",async(req,res)=>{
    const{email,password}=req.body

    try{
        const check=await collection.findOne({email:email})

        if(check){
            res.json("exist")
        }
        else{
            res.json("notexist")
        }

    }
    catch(e){
        res.json("fail")
    }

})

app.post("/signup",async(req,res)=>{
    const{email,password}=req.body

    const data={
        email:email,
        password:password
    }

    try{
        const check=await collection.findOne({email:email})

        if(check){
            res.json("exist")
        }
        else{
            res.json("notexist")
            await collection.insertMany([data])
        }

    }
    catch(e){
        res.json("fail")
    }

})



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
//

app.get('/forecast/:country/:city', async (req, res) => {

    var apireq = `https://api.openweathermap.org/data/2.5/forecast?q=${req.params.city},${req.params.country}&units=metric&appid=b5331a7dcbc34c05a7cab530bc441d05`;

    try {
        // Fetch data from the API
        const response = await fetch(apireq);
        const forecastData = await response.json();

        // Parse the forecast data into the specified format
        const formattedForecast = formatForecastData(forecastData);

        // Send the formatted data as JSON response
        res.json(formattedForecast);
    } catch (error) {
        console.error('Error fetching forecast data:', error);
        res.status(500).json({ error: 'Failed to fetch forecast data' });
    }
});

function formatForecastData(forecastData) {
    const formattedForecast = {};

    // Loop through each forecast item
    forecastData.list.forEach(item => {
        const dateTime = new Date(item.dt_txt);
        const dayOfWeek = dateTime.toLocaleDateString('en-US', { weekday: 'long' });
        const hourOfDay = `hour${dateTime.getHours()}`;

        // Initialize day if not already present
        if (!formattedForecast[dayOfWeek]) {
            formattedForecast[dayOfWeek] = {};
        }

        // Initialize hour if not already present
        if (!formattedForecast[dayOfWeek][hourOfDay]) {
            formattedForecast[dayOfWeek][hourOfDay] = { hour: dateTime.getHours() };
        }

        // Extract weather details
        const weatherDetails = {
            weather: {
                main: item.weather[0].main,
                description: item.weather[0].description,
                icon: item.weather[0].icon
            },
            temperature: item.main.temp,
            feelsLike: item.main.feels_like
        };

        // Add weather details to the formatted forecast
        formattedForecast[dayOfWeek][hourOfDay] = { ...formattedForecast[dayOfWeek][hourOfDay], ...weatherDetails };
    });

    return formattedForecast;
}


var server = app.listen(7777,function(){
    var port = server.address().port;
    console.log('Server is listening at port ' + port);
});