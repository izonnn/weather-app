const express = require('express');
const app = express();
const geocode = require('./utils/geocode');
const forecast = require('./utils/darksky');
const cors = require('cors');
const port = process.env.PORT || 3000;

app.use(cors());

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.status(404).send('Please provide an address');
    }
    geocode(req.query.address, (err, { latitude, longitude, location }) => {
        if (err) {
            return res.send(err);
        }

        forecast(latitude, longitude, (err, forecastData) => {
            if (err) return res.send(err);

            res.send({
                forecase: forecastData,
                location,
                address: req.query.address
            })
        })
    });
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})