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

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");

app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/page.html");
});
app.post("/", function (req, res) {
  const cityName = req.body.cityName;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=35.22709&lon=-80.84313&appid=2ddae03d97a6eb6309cf2bd5d2ca661c&units=imperial`;
  https.get(url, function (response) {
    response.on("data", function (data) {
      const jsondata = JSON.parse(data);
      const temp = jsondata.main.temp;
      const des = jsondata.weather[0].description;
      const icon = jsondata.weather[0].icon;
      const imageurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write(`<h1>The temp in ${cityName} is ${temp} degrees</h1>`);
      res.write(`<p>The weather description is ${des} </p>`);
      res.write("<img src=" + imageurl + ">");
      res.send();
    });
  });
});
app.listen(9000);