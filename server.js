const express = require('express')

const app = express()

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    // res.send('<h1>Hello Express!</h1>')
    res.send({
        name: 'Ahmed',
        age: 44,
        likes: ['coding', 'eating', 'youtubing']
    })
})

app.get('/about', (req, res) => {
    res.send('About page')
})

app.get('/bad', (req, res) => {
    res.send({ errorMessage: 'Unable to handle request.'} )
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})