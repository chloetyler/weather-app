const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express()

// ------ Routes ------
//get the FULL path to the public directory (/Users/ctyler/Courses/assignments/node-course/web-server/public)
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
console.log(viewsPath);

//handlebars expects to have your components stored in a directory called "views" at the root of your project
app.set('view engine', 'hbs');
//you can chnage it by passing in a specified path:
app.set('views', viewsPath);
//same thing now but for partials:
hbs.registerPartials(partialsPath);

//the line below tells express to serve up the contents of the public directory
app.use(express.static(publicDirectoryPath));

//get index.hbs from the views directory so it can actually be seen in the browser!
//first arg is the name of the file to render, second is an object of all the values you want the file to access

//home
app.get('', (req, res) => {
    res.render('index', {
        title: 'Thunder',
        name: 'Chloe',
    });
})

//about
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Weather App - About',
        name: 'Chloe',
    });
})

//help
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Weather App - Help',
        name: 'Chloe',
        message: 'Help! This is a help message :)',
    });
})

//weather
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please enter a valid search',
        });
    }

    geocode(req.query.address, (error, { lat, long, location } = {}) => {
        if (error) {
            return res.send(error);
        }
    
        forecast(lat, long, (error, { summary, temperature, precipProb }) => {
            if (error) {
                return res.send(error);
            }

            res.send({
                location: "Weather report for: " + location,
                summary: summary,
                forecast: "It is currently " + temperature + " degrees. There is a " + precipProb + "% chance of showers.",
                address: req.query.address
            });
        })
    })
})

// "*" wildcard for 404 error
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Chloe',
        error: 'Article not found',
    });
})

// needs to come last because express will check each app.get in order that they are in
// think of them like ifs and this like an else
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Chloe',
        error: 'Page not found',
    });

})

// Epress serves the app on port 3000 and returns the response from app.get
app.listen(3000, () => {
    console.log('Server is up on port 3000')
})