const express = require('express')

const port = process.env.PORT || 3000
const app = express()

app.get('', (req, res) => {
    res.status(201).send('Home page')
})

app.get('*', (req, res) => {
    res.status(404).send('Page Not Found')
})

app.listen(port, () => {
    console.log('Up and running at port', port)
})