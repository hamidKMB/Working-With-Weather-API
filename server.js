const express = require('express')
const bodyParser = require('body-parser')
const http = require('http')
// an native nodejs method for get data from external Server
// SOMETHING WIERD : IDK why when i require the HTTPS the api doesn't work
//and actuly the openweathermap API works with HTTP when i copy The URL from the chrome

const app = express();
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
   res.sendFile(__dirname+"/index.html");

  })

  app.post("/", (req , res) => {
    let city = req.body.city;
    const apiKey ="4363c36eebe25f236e541cddd255d093";
    let unit = req.body.unit;
    const url = "http://api.openweathermap.org/data/2.5/weather?q="+ city +"&appid="+ apiKey +"&units="+ unit;
    //assign a const to URL for that the function be viewable easilly

    http.get(url, (resp) => {
      // getting information from our API

      console.log('status code is : ' + resp.statusCode);
      //console.log(resp); (remembr this)

      resp.on("data", (data) => {
        //get the data recieved from API on data event

        const weatherData = JSON.parse(data);
        //parsing the json data comes from API For manupulating with the items we need

        const temp = weatherData.main.temp;
        //showing the temprature

        const feelsLike = weatherData.main.feels_like;
        //showing the feels feelsLike

        const weatherDescription = weatherData.weather[0].description ;
        //showing the weather discription

        const city = weatherData.name;
        //showing the city name

        const weatherIcon = weatherData.weather[0].icon;
        //showing the weather weather

        var unitMessurement = messurement(unit);

        res.write("<h1> The Temprature in "+city + " is " + temp + " " + unitMessurement + " but it Feels Like " + feelsLike + "</h1>")
        res.write("<p>the sky are "+weatherDescription+"</p>")
        res.write("<img src='http://openweathermap.org/img/wn/"+weatherIcon+"@4x.png'>")
        res.send()
      })
    })

  })
  //res.send("Server is Up") we Only can have one res.send() but we can have res.write() how many times we want

app.listen( 3000 , () => {
  console.log('Server is Running on http://localhost:3000 ')
})

function messurement(i) {
  if (i === "metric") {
    return "cellicius";
  }else if (i === "imperial"){
    return "Farenhait";
  }else{
    return "kelvin";
  }
}
// degree unit
