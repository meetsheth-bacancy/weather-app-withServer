const request = require('request');
const chalk = require('chalk');


const find_weather = (lat,long,callback) => {
const url = 'http://api.weatherstack.com/current?access_key=60e9502cd268726c87d7ef049596b6e3&query='+lat+','+long;

request({url : url, json : true}, (error,response) => {
    //option json : true parses the json basec response output . So no need to parse it explicitly
    //const objData = JSON.parse(response.body);
    const obj = response.body; // json is parsed
    
    // console.log(obj.current.weather_descriptions[0]+'. It is currently '+obj.current.temperature+' farenheit out. It feels like '+obj.current.feelslike+' farenheit out.');
    callback(obj.current.temperature);
});
}

module.exports = {
    find_weather : find_weather
}