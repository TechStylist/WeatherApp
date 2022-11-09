var express = require('express');
var router = express.Router();
const server=require("https");
const fetch = require('node-fetch');
var requests = require('requests');
const fs=require('fs');
const { Script } = require('vm');
//const { Country } = require('country-state-city');
//const Country=require("country-state-city").Country
//console.log(Country.getAllCountries());
// const State=require("country-state-city").State
// var state=State.getStatesOfCountry("IN");

module.exports = router;


router.get("/", (req, res) => {
    res.render("index", { data: null, error: "  Enter a city name to get weather data of your area..." });
   
})
router.post("/", (req, res) => {
    let cityNames = req.body.citynames;
    
    // console.log(cityNames)
    requests(`https://api.openweathermap.org/data/2.5/weather?q=${cityNames}&appid=cc6d849455a4cc9c04b1203ff6894da4&units=metric`)
    .on('data', function (chunk) {
    const objdata=JSON.parse(chunk);
    const arrdata=[objdata];
    const icon=arrdata[0].weather[0].description;
    const ctname= arrdata[0].name;
    const countryname=arrdata[0].sys.country;
    const temp=arrdata[0].main.temp;
    const humidity=arrdata[0].main.humidity;
    const sunrise= arrdata[0].sys.sunrise;
   
    // console.log(icon);
    //console.log(arrdata[0].sys.country)
    //console.log(arrdata[0].main.temp);
    //console.log(arrdata[0].weather[0].description);
    // if(icon== "clear sky"){
    // document.body.style.backgroundColor = 'green';
    // console.log("good")
    // }
    
    res.render("index",{data:chunk,error:null,ctname,icon,countryname,temp,humidity,sunrise})
    })
    .on('end', function (err) {
    if (err) return console.log('connection closed due to errors', err);
    });

});


