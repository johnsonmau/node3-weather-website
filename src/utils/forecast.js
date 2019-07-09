const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = 'https://api.darksky.net/forecast/20d507b2eaec1faf77755732b1cad83a/'+latitude+','+longitude

    request({ url, json: true }, (error, { body }) => {
        if (error){
            callback('Error, cannot access Dark Sky API', undefined)
        } else if (body.error){
            callback('Unable to get weather', undefined)
        } else {
            const temp = body.currently.temperature
            const prob = (body.currently.precipProbability)*100
            const summary = body.daily.data[0].summary
            callback(undefined, summary + ' It is currently ' + temp + ' degrees out. There is a ' + prob + '% chance of rain.')
        }
    })
}

module.exports = forecast