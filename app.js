//WEATHER APP
//THESE ARE THE PACKAGES WE WILL USE FOR THIS APP!!
// const express = require("express");
// const app = express();//commonly used like this for a post or git 
// const bodyParser = require("body-parser");
// const https = require("https");

// //CREATED OUR ROUTE FOR URL TO PAGE.HTML
// app.use(bodyParser.urlencoded({extended:true}));//method for body parser grab our url code to return our request for content type to be true//body-parser:we taking the body of the data within the url
// app.get("/",function(req,res){//grab page.html file and putting into req and res

//     res.sendFile(__dirname + "/page.html");
// });

// // HERE WE WILL IMPLEMENT OUR API CALL TO OUR URL

// app.post('/', function(req,res){
// const cityName = req.body.cityName;
// const url = `https://api.openweathermap.org/data/2.5/weather?lat=35.22709&lon=-80.84313&appid=2ddae03d97a6eb6309cf2bd5d2ca661c&units=imperial`;
// https.get(url,function(response){
// response.on("data",function(data){

//     const jsondata = JSON.parse(data);
//     console.log(jsondata);//put it into a json format
//     const temp = jsondata.main.temp;
//     const des = jsondata.weather[0].description;
// const icon = jsondata.weather[0].icon;
// const imageurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
// res.write(`<h1>The temperature in ${cityName} is ${temp} degrees</h1>`);
// res.write(`<p>The weather description is ${des}</p>`);
// res.write("<img src = " + imageurl + ">" );
// });

// });
// });

// app.listen(9000);


//THESE ARE THE PACKAGES WE WILL USE FOR THIS APP!!
// const express = require("express");
// const app = express();
// const bodyParser = require("body-parser");
// const http = require("http");
// const port = 9000;

// //  //CREATED OUR ROUTE FOR URL TO PAGE.HTML
// app.use(bodyParser.urlencoded({ extended: true }));

// app.get("/", function (req, res) {
//   res.sendFile(__dirname + "/page.html");
// });

// // // HERE WE WILL IMPLEMENT OUR API CALL TO OUR URL
// app.post("/", function (req, res) {
//   const cityName = req.body.cityName;
//   const apiKey = '24c0068098724bf298b44257081adfe0'; // Replace with your OpenCage Data API key
// const geocodeUrl = `https://api.opencagedata.com/geocode/v1/json?q=${cityName}&key=${apiKey}`;//variable is the URL for the OpenCage Data API request. It uses the geocode/v1/json endpoint to retrieve geolocation data based on a provided query string (q=${cityName}) representing the city name or zip code, and includes the API key as a parameter (key=${apiKey}).

//   https.get(geocodeUrl, function (response) {//o send an HTTP GET request to the geocodeUrl to retrieve the geolocation data.
//     response.on("data", function (data) {//The response from the API request is received as a stream of data. The response.on('data', function (data) {...}) event listener is triggered whenever data is received.
//       const geocodeData = JSON.parse(data);//Inside the event listener, the received data is parsed as JSON using JSON.parse(data), and the resulting object is assigned to the geocodeData variable.
//       const lat = geocodeData.results[0].geometry.lat;
//       const lng = geocodeData.results[0].geometry.lng;//From the geocodeData object, the latitude (lat) and longitude (lng) values are extracted from the results[0].geometry property. These represent the coordinates of the provided city or zip code.

//       const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=2ddae03d97a6eb6309cf2bd5d2ca661c&units=imperial`; //new weatherUrl is constructed for the OpenWeatherMap API request. The URL includes the latitude and longitude in the query parameters, along with the API key and other parameters for units and data format.

//       http.get(weatherUrl, function (weatherResponse) {//you can fetch the weather data by using the weatherUrl with the appropriate HTTP request method, such as https.get() 
//         weatherResponse.on("data", function (weatherData) {
//           const jsondata = JSON.parse(weatherData);
//           const temp = jsondata.main.temp;
//           const des = jsondata.weather[0].description;
//           const icon = jsondata.weather[0].icon;
//           const imageurl =
//             "http://openweathermap.org/img/wn/" + icon + "@2x.png";
//           res.write(`<h1>The temp in ${cityName} is ${temp} degrees</h1>`);
//           res.write(`<p>The weather description is ${des} </p>`);
//           res.write("<img src=" + imageurl + ">");
//           res.send();
//         });
//       });
//     });
//   });
// });

// app.listen(9000);

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const http = require("http");

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/page.html");
});

app.post("/", function (req, res) {
  const cityName = req.body.cityName;
  const apiKey = '24c0068098724bf298b44257081adfe0';
  const geocodeUrl = `https://api.opencagedata.com/geocode/v1/json?q=${cityName}&key=${apiKey}`;

  http.get(geocodeUrl, function (response) {
    response.on("data", function (data) {
      const geocodeData = JSON.parse(data);
      const lat = geocodeData.results[0].geometry.lat;
      const lng = geocodeData.results[0].geometry.lng;

      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=2ddae03d97a6eb6309cf2bd5d2ca661c&units=imperial`;

      http.get(weatherUrl, function (weatherResponse) {
        let weatherData = "";
        weatherResponse.on("data", function (chunk) {
          weatherData += chunk;
        });

        weatherResponse.on("end", function () {
          const jsondata = JSON.parse(weatherData);
          const temp = jsondata.main.temp;
          const des = jsondata.weather[0].description;
          const icon = jsondata.weather[0].icon;
          const imageurl =
            "http://openweathermap.org/img/wn/" + icon + "@2x.png";
          res.write(`<h1>The temp in ${cityName} is ${temp} degrees</h1>`);
          res.write(`<p>The weather description is ${des} </p>`);
          res.write("<img src=" + imageurl + ">");
          res.send();
        });
      });
    });
  });
});

app.listen(9000, function () {
  console.log("Server is running on port 9000");
});
