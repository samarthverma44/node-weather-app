const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode');
const weather = require('./utils/weather');

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Samarth'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Us',
        name: 'Samarth'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Samarth'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if(!address){
        return res.render('404page',{
            error:"Please provide an address as a part of query string"
        })
    }

    geocode(address,(geocode_error,geocode_res)=>{
        if(geocode_error){
            return res.render('404page',{
                error:geocode_error
            })
        }
        const {center,place_name} = geocode_res
        weather(center,(weather_error,weather_res)=>{
            if(weather_error){
                return res.render('404page',{
                    error:weather_error
                })
            }
            const{description,temp,feelsLike} = weather_res
            return res.render('weather',{
                place_name,description,temp,feelsLike
            })
        })
    })
})

app.get('/help/*',(req,res)=>{
    res.render("404page",{
        title:"404",
        error:"Help Page Not Found",
        name:"Samarth"
    })
})

app.get('*',(req,res)=>{
    res.render("404page",{
        title:"404",
        error:"Page Not Found",
        name:"Samarth"
    })
})


app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})