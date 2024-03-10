const express = require('express');
const request = require('request');
const app = express();
const collection = require("./mongo")
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const cors = require('cors');

const fs = require('fs');

const corsOptions = {
    origin: 'http://localhost:3000', // Allow requests from this origin and its subpaths
    optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
};
// Enable CORS with specific options
app.use(cors(corsOptions));

async function resetLoggedIn() {
    try {
        await collection.updateMany({}, { $set: { logged_in: 0 } });
        console.log("Logged_in values reset to 0 successfully.");
    } catch (error) {
        console.error("Failed to reset logged_in values:", error);
    }
}
resetLoggedIn();


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

app.get('/getUsers', async (req, res) => {
    try {
        const users = await collection.find().toArray();
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Failed to fetch users" });
    }
});


app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await collection.findOne({ username: username });
        console.log("user status: " + user);
        if (user) {
            // Check if the password matches
            if (user.password === password) {
                // Set logged_in value to 1
                await collection.updateOne({ username: username }, { $set: { logged_in: 1 } });
                res.json("success");
            } else {
                res.json("wrongpass");
            }
        } else {
            res.json("notexist");
        }
    } catch (error) {
        res.json("fail");
        console.log("error logging in: " + error);
    }
});

app.post("/setCityCountry/:username/:city/:country", async (req, res) => {
    const { username, city, country } = req.params;

    try {
        // Find the user in the database
        const user = await collection.findOne({ username });

        if (user) {
            // Update the city and country for the user
            await collection.updateOne({ username }, { $set: { city, country } });
            res.json({ success: true, message: "City and country updated successfully." });
        } else {
            res.status(404).json({ success: false, message: "User not found." });
        }
    } catch (error) {
        console.error("Error setting city and country:", error);
        res.status(500).json({ success: false, message: "Failed to set city and country." });
    }
});

app.post("/logout/:username", async (req, res) => {
    const { username } = req.params;

    try {
        const user = await collection.findOne({ username: username });

        if (user) {
            // Update the logged_in value to 0
            await collection.updateOne({ username: username }, { $set: { logged_in: 0 } });
            res.json("success");
        } else {
            res.json("user not found");
        }
    } catch (error) {
        res.json("fail");
    }
});

app.post("/signup", async (req, res) => {
    const { username, password } = req.body;

    const userData = {
        username: username,
        password: password,
        logged_in: 0 // Set logged_in value to 0 for new users
    };

    try {
        const existingUser = await collection.findOne({ username: username });

        if (existingUser) {
            res.json("exist");
        } else {
            // User doesn't exist, so insert new user data into the collection
            await collection.insertOne(userData); // Using insertOne to add a new user
            res.json("success");
        }
    } catch (error) {
        res.json("fail");
    }
});

app.post("/authorize/:user", async (req, res) => {
    const { user } = req.params;

    try {
        // Find the user in the database
        const foundUser = await collection.findOne({ username: user });

        if (foundUser) {
            // Check if the user is logged in
            if (foundUser.logged_in === 1) {
                res.json({ authorized: true });
            } else {
                res.json({ authorized: false, message: "User is not logged in." });
            }
        } else {
            // User not found in the database
            res.status(404).json({ authorized: false, message: "User not found." });
        }
    } catch (error) {
        // Error handling
        console.error("Error authorizing user:", error);
        res.status(500).json({ authorized: false, message: "Failed to authorize user." });
    }
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
//

app.get('/forecast/:country/:city', async (req, res) => {

    var apireq = `https://api.openweathermap.org/data/2.5/forecast?q=${req.params.city},${req.params.country}&units=metric&appid=b5331a7dcbc34c05a7cab530bc441d05`;

    try {
        // Fetch data from the API
        const response = await fetch(apireq);
        const forecastData = await response.json();

        // Parse the forecast data into the specified format
        const output = forecastRestruct(forecastData);

        // Send the formatted data as JSON response
        res.json(output);
    } catch (error) {
        console.error('Error fetching forecast data:', error);
        res.status(500).json({ error: 'Failed to fetch forecast data' });
    }
});

function getDayOfWeek(dateString) {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(dateString);
    const dayOfWeekIndex = date.getDay();
    return daysOfWeek[dayOfWeekIndex];
}

function forecastRestruct(forecastData) {
    const formattedForecast = {};

    // Iterate over the list of forecasts
    forecastData.list.forEach(forecast => {
        // Extract date from forecast datetime
        const date = getDayOfWeek(forecast.dt_txt.split(' ')[0]);

        // If the date doesn't exist in formattedForecast, create an array for it
        if (!formattedForecast[date]) {
            formattedForecast[date] = [];
        }

        // Push the forecast into the array corresponding to its date
        formattedForecast[date].push({
            hour: new Date(forecast.dt_txt).getHours(),
            temp: forecast.main.temp,
            description: forecast.weather[0].description,
            icon: forecast.weather[0].icon
        });
    });

    return formattedForecast;
}


var server = app.listen(7777,function(){
    var port = server.address().port;
    console.log('Server is listening at port ' + port);
});