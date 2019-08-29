const request = require('request');

const geocode = (address, callback) => {
    const mapEndPoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?bbox=-77.083056,38.908611,-76.997778,38.959167&access_token=pk.eyJ1IjoiaXpvbm5uIiwiYSI6ImNqemZtaXE4YTAwNWQzY3BlZzB5YmFpOHUifQ.2_nxKkGSGMJmhThFC1qtng`
    request({ url: mapEndPoint, json: true }, (err, data) => {
        if (err) {
            callback('Unable to connect to location services!', undefined);
        } else if (data.body.features.length === 0) {
            callback('Unbale tp find location. Try anoter search.', undefined)
        } else {
            callback(undefined, {
                latitude: data.body.features[0].center[1],
                longitude: data.body.features[0].center[0],
                location: data.body.features[0].place_name
            });
        }


    });
}

module.exports = geocode;