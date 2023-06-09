
'use strict';
// Weather App
// First Step - Install our packages
// Second Step - Store the packages as variables
const express = require('express');
const app = express(); //  using express(), and it is assigned to the app variable. This allows you to use the app variable to define routes and start the server
const bodyParser = require('body-parser');//middleware is configured to parse the request body. It is added to the middleware stack using app.use()
const https = require('https');
// The root route ("/") is defined using app.get(). When a GET request is made to the root route, the server responds by sending the page.html file
app.use(bodyParser.urlencoded({extended: true})) // Pulling the API to the page.html
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/page.html');
})
//The root route ("/") is also set up to handle POST requests. 
//When a POST request is made to the root route (which happens when the form in page.html is submitted), the code inside the callback function is executed.
app.post('/', (req, res) => {//Inside the POST route callback, two API calls are made
  const cityName = req.body.cityName; // This is where we request the information from our bodyParser
  const state = req.body.state
  //The first API call is to the OpenWeatherMap Geo API  to retrieve the latitude and longitude of the provided city and state.
  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName},${state},US&limit=&appid=2ddae03d97a6eb6309cf2bd5d2ca661c`
  https.get(url,function(response){
      response.on("data",(data)=>{
      const countryData = JSON.parse(data)[0]
      const lat = countryData.lat
      const lon = countryData.lon
      //The second API call is made to the OpenWeatherMap Weather API  using the obtained latitude and longitude to get the weather information.
      const url2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=2ddae03d97a6eb6309cf2bd5d2ca661c&units=imperial`; // creating a varibale for our url, which will hold our API key
//The response from the Weather API is received in chunks
      https.get(url2, (response) => {
          response.on('data', (data) => {
            //The data is parsed as JSON and used to extract the temperature, weather description, and weather icon
              const jsonData = JSON.parse(data);
              const temp = jsonData.main.temp;
              const des = jsonData.weather[0].description;
              const icon = jsonData.weather[0].icon;
              const imageURL = 'http://openweathermap.org/img/wn/' + icon + '@2x.png';
              console.log(jsonData);
              //The server then sends an HTML response to the client (res.write()) displaying the temperature, weather description, and weather icon
              res.write(`<h1>The temperature in ${cityName} is ${temp}F </h1>`);
              res.write(`<p>The weather is considered ${des}</p>`)
              res.write('<img src = ' + imageURL + '>')
          })
      })
      })
  })
})
//The server is started by calling app.listen()  
app.listen(9000, () =>{//specifying the port number to listen on
  console.log(`calling port 9000!`)//A console log message is printed to indicate that the server has started successfully.
})