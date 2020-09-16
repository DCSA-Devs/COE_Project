const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const multer = require('multer')
// import mongoose models
const Student = require('../mongoose/models/student')
const router = express.Router()
//config jwt
const jwtKey = "coeProject"
const jwtExpirySeconds = 30000
//config multer
const upload = multer({
    limits: {
        fileSize: 102400
    },
    fileFilter(res, file, cb) {
        if (file.originalname.match(/\.(jpg|png)$/)) {
            cb(null, true)
        }
        else
            cb(new Error('File format not supported'))
    }
})

// auth middleware
const auth = async (req, res, next) => {
    if (!req.cookies.token) {

    }
    else {
        const token = req.cookies.token
        console.log(token);
        if (token) {
            try {
                const { username: email } = jwt.verify(token, jwtKey)
                console.log(email)
                const user = await Student.findOne({ email })
                req.user = user
            }
            catch (e) {
                res.send(e)
            }
        }
    }
    next()
}



router.get('', auth, async (req, res) => {
    if (!req.user) {
        return res.render('index', { message: 'No cookie found' })
    }
    res.render('index', { message: `Welcome ${req.user.firstName}` })
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

router.get('/upload-avatar', (req, res) => {
    res.render('upload')
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await Student.findOne({ email })
        if (!user)
            res.render('index', {
                message: 'Incorrect credentials'
            })
        else if (bcrypt.compareSync(password, user.password)) {
            console.log(user);
            console.log(user.firstName + ' ' + user.lastName);
            const token = jwt.sign({ username: user.email }, jwtKey, {
                algorithm: "HS256",
                expiresIn: jwtExpirySeconds
            })
            console.log('Token:', token);

            res.cookie('token', token, { maxAge: jwtExpirySeconds * 1000, httpOnly: true })
            res.render('index', { message: 'Login Successfull' })
        }
        else
            res.render('index', {
                message: 'Incorrect credentials'
            })
    }
    catch (e) {
        console.log(e);
        res.status(500).send(e)
    }
});

router.post('/register', async (req, res) => {
    const user = req.body
    console.log(user);
    if (!user) {
        return res.status(500).send('Error registering user')
    }
    //check whether user is already registered or not
    const emailCheck = await Student.findOne({ email: user.email })
    if (emailCheck) {
        return res.render('index', {
            message: 'Register Failed : Email Already Registered'
        })
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

router.post('/upload-avatar', [auth, upload.single('avatar')], async (req, res) => {
    if (!req.user) {
        return res.render('login', { message: 'Plz login before file upload' })
    }
    console.log(req.file)
    try {
        req.user.avatar = req.file.buffer
        await req.user.save()
    } catch (e) {
        return res.send(e)
    }
    res.render('upload', { message: 'File Uploaded Sucessfully' })
})

router.post('/get-avatar', auth, async (req, res) => {
    console.log(req.user);
    if (!req.user) {
        return res.render('login', { message: 'Plz login before file upload' })
    }
    console.log(req.user.avatar);
    res.set('Content-Type', 'image/jpg')
    res.send(req.user.avatar)
})

module.exports = router