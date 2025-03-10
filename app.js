const express = require("express");
const https = require("https")
const bodyParser = require("body-parser")
const app = express(); 

app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function (req, res) {
    res.sendFile(__dirname+"/index.html")
})

app.post("/", function(req, res){
    const query = req.body.cityName
    const apiKey = "b6921ddb6f6dc27997fb74db2c567e30";
    const unit = "metric"
    
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;
    https.get(url, function(response){
        console.log(response.statusCode)
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imgURL = "https://openweathermap.org/img/wn/"+icon+"@2x.png"
            console.log(temp);
            console.log(weatherDescription);
            res.write("<p>The weather is currently "+weatherDescription +"</p>")
            res.write("<h1>The temperature  in "+query+ " is "+temp +" degrees Celcius</h1>");
            res.write("<img src="+imgURL+">");
            res.send()

            
        })
    }) 



})

    
 

app.listen(3000, function (){
    console.log("The server is running on port 3000")
}) 