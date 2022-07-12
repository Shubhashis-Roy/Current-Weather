const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true })) //passing a post request

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html")
});

app.post("/", function(req, res) {

    // console.log(req.body.cityName)
    // console.log("post recieved")

    const query = req.body.cityName
    const apiKey = "ccc931b4888e2cd6749b3ad5b3bd8ed3"
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit



    https.get(url, function(response) {
            console.log(response.statusCode);

            response.on("data", function(data) {
                // console.log(data) # pt the data in the form of hexCode in terminal
                const weatherData = JSON.parse(data) // #hexa formet data covert into json form
                console.log(weatherData)

                const temp = weatherData.main.temp
                console.log(temp)
                    // const weatherDescription = weatherData.weather[0].description
                    // console.log(weatherDescription)

                const feelsLike = weatherData.main.feelsLike
                console.log(feelsLike)

                const icon = weatherData.weather[0].icon
                console.log(icon)
                const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"

                res.write("<p>The temp is feels_like " + feelsLike + ".<p>")
                res.write("<h1> The temp is " + query + " is " + temp + " deegree. </h1>")
                res.write("<img src=" + imageURL + ">")
                res.send()
            })
        })
        // res.send("<h1>server is running....<\h1>")

})

// new codw start
app.get("/data", function(req, res) {

})

app.listen(process.env.PORT || 3000, function() {
    console.log("Server start on port 3000");
})