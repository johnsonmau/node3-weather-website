const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
const bootstrapPath = path.join(__dirname, '/../node_modules/bootstrap/dist')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))
app.use(express.static(bootstrapPath))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'weather',
        name: 'Maurice Johnson'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about',
        name: 'Maurice Johnson'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help',
        name: 'Maurice Johnson'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address){
        return res.send({
            Error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, placeName} = {}) => {
        if (error) return res.send({ error })

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) return res.send({ error })
    
            res.send({
                forecast: forecastData.currently.summary + '. It is currently ' + Math.round(forecastData.currently.temperature)
                + ' degrees out.  Winds are blowing at about ' + Math.round(forecastData.currently.windSpeed) + 'MPH.',
                location: placeName,
                address: req.query.address,
                fiveday: forecastData.daily.data
            })
          })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Maurice Johnson',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Maurice Johnson',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server listening on port ' + port)
})