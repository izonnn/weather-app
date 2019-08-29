const request = require('request');

const forecast = (latt, long, callback) => {
    const endPoint = `https://api.darksky.net/forecast/79b8a3f5fe03f2c7a6162311311bdc79/${latt},${long}`;
    request({ url: endPoint, json: true }, (err, data) => {
        if (err) {
            callback('Unable to connect to location services!', undefined);
        } else if (data.body.error) {
            callback('Unbale to find weather. Try anoter search.', undefined)
        } else {
            callback(undefined, `${data.body.daily.data[0].summary} It is currently ${data.body.currently.temperature} degress out. `);
        }
    });
}

module.exports = forecast;