const request = require('request');
const chalk = require('chalk');


const find_geoLocation = (address, callback) => {
const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?types=address&access_token=pk.eyJ1Ijoic2hldGhtZWV0OTkiLCJhIjoiY2tsajZnMm02MDVpZzJ3bzk5dW5iM2xzMyJ9.bajSGwdxxLGMlf6yQf7xhA&limit=1';

request({url : url, json : true},(error,response) => {
    const objData = response.body;

    //console.log(objData);
    const lat = objData.features[0].center[1];
    const long = objData.features[0].center[0];
    const place = objData.features[0].place_name;
    //console.log('Lat : '+lat+" and Long: "+long);
    callback(place,lat,long);
   

});
}
// find_geoLocation('New york ',(place,lat,long)=>{
//     console.log('Place : '+place+chalk.green.inverse(' Coordinates : '+lat+' , '+long));
// })

module.exports = {
    find_geoLocation : find_geoLocation
}