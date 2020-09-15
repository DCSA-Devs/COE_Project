const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// import mongoose models
const Student = require('../mongoose/models/student')

//config jwt
const jwtKey = "coeProject"
const jwtExpirySeconds = 300

const router = new express.Router()

router.get('', async (req, res) => {
    const token = req.cookies.token
    if (token) {
        try {
            const payload = jwt.verify(token, jwtKey)
            return res.render('index', { message: 'Cookie Detected : ' + payload.username });
        }
        catch (e) {
            console.log(e);
        }
    }
    res.render('index', { message: 'No Cookie Detected ' })
})

router.get('/login', async (req, res) => {

    res.render('login')

})
router.get('/register', async (req, res) => {
    res.render('register')
})
router.get('/viewall', async (req, res) => {
    const users = await Student.find({})
    res.status(200).send(users)
})
router.post('/login', async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await Student.findOne({ email })
        if (!user)
            res.render('index', {
                errorMessage: 'Incorrect credentials'
            })
        else if (bcrypt.compareSync(password, user.password)) {
            console.log(user);
            console.log(user.firstName + ' ' + user.lastName);
            const token = jwt.sign({ username: user.firstName + ' ' + user.lastName }, jwtKey, {
                algorithm: "HS256",
                expiresIn: jwtExpirySeconds
            })
            console.log('Token:', token);

            res.cookie('token', token, { maxAge: jwtExpirySeconds * 1000 })
            res.render('index', { message: JSON.stringify(user) })
        }
        else
            res.render('index', {
                errorMessage: 'Incorrect credentials'
            })
    }
    catch (e) {
        console.log(e);
        res.status(500).send(e)
    }
});
router.post('/register', async (req, res) => {
    const user = req.body.user
    if (!user) {
        return res.status(500).send('Error registering user')
    }

    const emailCheck = await Student.findOne({ email: user.email })
    if (emailCheck) {
        return res.render('index', { message: 'Register Failed : Email Already Registered' })
    }
    // Hashing the password
    const hash = bcrypt.hashSync(user.password, 8)
    user.password = hash
    const student = new Student(user)
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

module.exports = router