const request = require("request");

const getWeather = (location, callback) => {
   const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=299cc840e46c039afb40343b83679af9&units=metric`;
 
   request({ url: url, json: true }, (error, response) => {
     if (error) {
       callback("unable to connect to weather service!", undefined);
     } else if (response.body.cod === "404") {
       callback("unable to find location", undefined);
     } else {
       callback(undefined, response.body);
     }
   });
 };

 module.exports=getWeather