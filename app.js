const { response } = require("express");
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html");
})


app.post("/", function(req,res){
    const Location = req.body.cityName;
    const apiKey = "X";
    const units = "metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+ Location +"&appid="+ apiKey +"&units=" + units;

    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const weatherFeels = weatherData.main.feels_like;
            const weatherDescrip = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write("<h1>The temp in " + Location + " is: "+ weatherFeels+ " degree celcius</h1>");
            res.write("<p>The description of the weather is: " + weatherDescrip + "</p>");
            res.write("<img src=" + imageURL + ">");
            res.send();
        })
    })
})




app.listen(3000, function(){
    console.log("Server is running on port 3000");
})
