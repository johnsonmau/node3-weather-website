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
            //const prob = (body.currently.precipProbability)*100
            const summary = body.daily.data[0].summary
            const windSpeed = body.currently.windSpeed
            callback(undefined, summary + ' It is currently ' + Math.round(temp) + ' degrees out.  Winds are blowing at about ' + Math.round(windSpeed) + 'MPH')
        }
    })
}

module.exports = forecast