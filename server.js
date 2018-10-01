const express = require('express')
const hbs = require('hbs')

const app = express()

app.set('view engine', 'hbs')

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Welcome to our site',
        currentYear: new Date().getFullYear(),
        message: 'Welcome our visitor'
    })
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About page',
        currentYear: new Date().getFullYear()
    })
})

app.get('/bad', (req, res) => {
    res.send({ errorMessage: 'Unable to handle request.'} )
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})