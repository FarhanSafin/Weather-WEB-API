const { response } = require("express");
const express = require("express");
const https = require("https");

const app = express();


app.get("/", function(req,res){
    res.send("HELLO ADMIN");
    const url="https://api.openweathermap.org/data/2.5/weather?q=Dhaka&appid=737f67de0f2cb801f61437647cddf9e3&units=metric";

    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const weatherFeels = weatherData.main.feels_like;
            const weatherDescrip = weatherData.weather[0].description;
            console.log(weatherFeels);
            console.log(weatherDescrip);
        })
    })
})

app.listen(3000, function(){
    console.log("Server is running on port 3000");
})