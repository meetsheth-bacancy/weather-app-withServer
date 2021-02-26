const path = require('path');
const hbs = require('hbs');
const geo_locations = require('./utils/geo-locations.js');
const weatherJS = require('./utils/weather.js');

const express = require('express');
const weather = require('./utils/weather.js');
const app = express();
let port = process.env.PORT || 3000;

// How to create paths efficiently
// console.log(__filename);
// console.log(__dirname);
//console.log(path.join(__dirname,'..','public'));

const public_dir = path.join(__dirname,"..","public");

// using this function...our public_dir will behave like htdocs of xampp (webserver)...u can fire any file like localhost:port/ file in public_dir
app.use(express.static(public_dir));

//above line renders only static content...to change value in html 'dynamically'...we need to use template engines. One we are going to use here is handlerbars for express (npm i express-hbs).

// following lines sets our template engine to hbs that we just installled

app.set('view engine','hbs');
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
app.set('views', viewsPath);
// partials are files which we can show on all/any pages we want like header and footer. They remain same across all pages.

hbs.registerPartials(partialsPath);


//now we need to setup a route to .hbs file stored in 'views' folder. It depends on you, if u  just want to render static content put it in 'public' folder. and if u want dynamicity, put it in 'views' folder

app.get('',(request,response)=>{
    response.render('index',{
        title:"Welcome to Home page. This  is coming from header partials",
        name:"Created by Meet Sheth"
    }); // index.hbs will render  
});

app.get('/help',(request,response)=>{
    response.render('help',{
        title:"Welcome to Help page. This  is coming from header partials",
        name:"Created by Meet Sheth"

    });
});

app.get("/about",(request,response)=>{
    response.render('about',{
        title:"Welcome to about page. This  is coming from header partials",
        name:"Created by Meet Sheth"
    });

});

app.get('/weather',(request,response)=>{
    if(!request.query.location)
    {
        return response.send("Please provide a location in query string");
    }
    
    // calling function to find geo locations
    geo_locations.find_geoLocation(request.query.location, (place,lat,long)=>{
        weatherJS.find_weather(lat,long,(temperature)=>{
            return response.send({
                place,
                lat,
                long,
                "temperature" : temperature
            });
        });
    });

    
});

app.get("/json",(request,response)=>{
    //response.send('Help page');
    //express automatically stringifies object to json
    console.log(request.query);
     response.send({
        name:"Meet Sheth",
        age:21,
        queryString : request.query.queryString
    });
    
});

app.get('/help/*',(request,response)=>{
    response.render('404',{
        title:"Help header",
        name:"Help footer",
        errorMessage:"Help article not found"
    })
});

app.get('*',(request,response)=>{
    response.render('404',{
        errorMessage: "Reqested page not found",
        title: "Header",
        name:"Footer"
        
    })
});

app.listen(port,()=>{
    console.log("Server is up and running on port : "+port);
});
