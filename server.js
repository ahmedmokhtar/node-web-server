const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

const app = express()

const port = process.env.PORT || 3000

// Change maintenance mode:
const maintenanceMode = false
// ------------

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')

app.use((req, res, next) => {
    const now = new Date().toString()
    const log = `${now}: Method: ${req.method}, Path: ${req.url}`

    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Error writing file: ', err)
        }
    })
    console.log(log)
    next()
})

app.use((req, res, next) => {
    maintenanceMode ? res.render('maintenance.hbs') : next()
})

app.use(express.static(__dirname + '/public'))

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
})

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase()
})

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        message: 'Hello visitor'
    })
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About page'
    })
})

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Projects',
        message: 'Welcome to the projects page'
    })
})

app.get('/bad', (req, res) => {
    res.send({ errorMessage: 'Unable to handle request.'} )
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})