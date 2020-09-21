const express = require('express')
const cookieParser = require('cookie-parser')
// const session = require('express-session')

//connecting to database
require('./mongoose/mongoose')

// import routers
const studentRouter = require('./routers/student')

//setting up PORT
const port = process.env.PORT || 3000

const app = express()
app.set('view engine', 'hbs')
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(studentRouter)

app.listen(port, () => {
    console.log('Running at PORT :', port);
})