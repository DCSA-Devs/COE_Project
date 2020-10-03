const express = require('express')
const path = require('path')

//connecting to database
require('./mongoose/mongoose')

// import routers
const studentRouter = require('./routers/student')

//setting up PORT
const port = process.env.PORT || 3000

const app = express()
app.set('view engine', 'hbs')
const imgPath = path.join(__dirname, 'public')
console.log(imgPath);
app.use(express.static(imgPath))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(studentRouter)

app.listen(port, () => {
    console.log('Running at PORT :', port);
})