const express = require('express')
const path = require('path')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
require('./mongoose/mongoose')
const hbs = require('hbs')
// import mongoose models
const Student = require('./mongoose/models/student')

// setup jwt
const jwtKey = "coeProject"
const tokenExpirySeconds = 300

const app = express()
app.set('view engine', 'hbs')
app.use(cookieParser())
app.use(express.urlencoded());
app.use(express.json());



app.get('', async (req, res) => {
    const token = req.cookies.token
    if (token) {
        try {
            const payload = await jwt.verify(token, jwtKey)
            return res.render('index', { message: payload.username });
        }
        catch (e) {
            console.log(e);
        }
    }

    res.render('index')
})

app.get('/login', async (req, res) => {

    res.render('login')

})
app.get('/register', async (req, res) => {
    res.render('register')
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await Student.findOne({ email })
        if (!user)
            res.render('error', {
                errorMessage: 'Incorrect credentials'
            })
        else if (bcrypt.compareSync(password, user.password)) {
            console.log(user);
            console.log(user.firstName + ' ' + user.lastName);
            const token = jwt.sign({ username: user.firstName + ' ' + user.lastName }, jwtKey, {
                algorithm: "HS256",
                expiresIn: tokenExpirySeconds
            })
            console.log(token);
            res.cookie('token', token, { maxAge: tokenExpirySeconds * 1000 })
            res.render('index', { message: "Logged in successfully" })
        }
        else
            res.render('error', {
                errorMessage: 'Incorrect credentials'
            })
    }
    catch (e) {
        console.log(e);
        res.status(500).send(e)
    }
});
app.post('/register', async (req, res) => {
    // Hashing the password
    const hash = bcrypt.hashSync(req.body.user.password, 8)
    req.body.user.password = hash
    const student = new Student(req.body.user)
    try {
        await student.save()
        console.log(student);
        res.render('index', {
            message: 'Account Created Successfully'
        })
    }
    catch (e) {
        console.log(e);
        res.status(500).send(e)
    }
});

app.listen(3000, () => {
    console.log('Running at port 3000');
})