const request = require('request');

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/5f96a5beb170891eff8aeaf33636cf80/' + lat + ',' + long + '?units=si';

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!')
        } else if (body.error) {
            callback('Unable to find location. Try another search')
        } else {
            callback(undefined, {
                summary: body.daily.data[0].summary,
                temperature: body.currently.temperature,
                precipProb: body.currently.precipProbability,
            })
        }
    })
}

module.exports = forecast