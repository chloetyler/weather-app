const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiY2hsb2V0eWxlciIsImEiOiJjazBncXVueTUwYWtxM2VxanI0d3pjaHQzIn0.71h0SdPpvVK699kN-zBOLg';

    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!')
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search')
        } else {
            callback(undefined, {
                lat: body.features[0].center[1],
                long: body.features[0].center[0],
                location: body.features[0].place_name,
            })
        }
    })
}

module.exports = geocode