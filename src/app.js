const express = require("express");
const hbs = require("hbs");
const path = require("path");
const geoCode = require('./utils/geoCode')
const forecast = require('./utils/forecat')

const app = express();

// console.log(__dirname) //Directory address
// console.log(__filename)// File address
// console.log(path.join(__dirname,'../public')) // adress of html directory

const publicDir = path.join(__dirname, "../public");
const viewsDir = path.join(__dirname, "../templates/views");
const partialsDir = path.join(__dirname, "../templates/partials");

app.set("view engine", ".hbs"); // Set up handlebar engine
app.set("views", viewsDir); // Views location
hbs.registerPartials(partialsDir);

app.use(express.static(publicDir)); //set up static directory to serve

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather App",
        name: "Manav Goel",
    });
});
app.get("/help", (req, res) => {
    res.render("help", {
        mess: "For any problem contact us at +91 8546321456",
        title: "Help",
        name: "Manav Goel",
    });
});
app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Me",
        name: "Manav Goel",
    });
});

app.get("/weather/address", (req, res) => {
    if (!req.query.place) {
        return res.render('404', {
            error: "Please Provide an Address.",
            name: "Manav Goel",
            title: "Address Error"
        })
    }
    geoCode(req.query.place, (error, { longitude,latitude,location}={})=>{
        if(error){
            return res.render('404', {
                error,
                name: "Manav Goel",
                title: "Address Error"
            })
        }
       // console.log(location)
        forecast(longitude,latitude,(error, { temperature,description,feels}={})=>{
            if(error){
                return res.render('404', {
                    error,
                    name: "Manav Goel",
                    title: "Address Error"
                })
            }
            res.render('wether', {
                temperature,
                place: req.query.place,
                location,
                description,
                feels,
                name: "Manav Goel",
                title: "Weather Result"
            });

        })

    })
    
});

app.get("/weather", (req, res) => {
    if (!req.query.place) {
        return res.send( {
            error: "Please Provide an Address.",
            name: "Manav Goel",
            title: "Address Error"
        })
    }
    geoCode(req.query.place, (error, { longitude, latitude, location } = {}) => {
        if (error) {
            return res.send({
                error,
                name: "Manav Goel",
                title: "Address Error"
            })
        }
        //console.log(location)
        forecast(longitude, latitude, (error, { temperature, description, feels } = {}) => {
            if (error) {
                return res.send({
                    error,
                    name: "Manav Goel",
                    title: "Address Error"
                })
            }
            
            res.send({
                temperature,
                place: req.query.place,
                location,
                description,
                feels,
                name: "Manav Goel",
                title: "Weather Result"
            })
        })

    })

});



app.get('/help/*', (req, res) => {
    res.render('404', {
        error: "Help article not found.",
        name: "Manav Goel",
        title: "Error"
    });
});

app.get("*", (req, res) => {
    res.render('404', {
        error: "Page not found.",
        name: "Manav Goel",
        title: "Error"
    });
});

app.listen(3000, () => {
    console.log("server started on Port 3000");
});
