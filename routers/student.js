// import modules
const express = require('express')
const bcrypt = require('bcryptjs')
const fs = require('fs')
const multer = require('multer')
const chalk = require('chalk')
const path = require('path')
const cookieSession = require("cookie-session");
const request = require('request')
let videos = []

// request.get({ url: 'https://api.streamtape.com/file/listfolder?login=bdec87c583f1acf16949&key=AloGmk4eerTvmQ', json: true }, (err, { body }) => {

//     videos = body.result.files
// })


// import passport config
const passport = require('../auth/passport');
// import config keys
const keys = require("../config/keys")
// import mongoose models
const Student = require('../mongoose/models/student')
// const { Session } = require('inspector')

const router = express.Router()
router.use(cookieSession({
    // milliseconds of a day
    maxAge: 24 * 60 * 60 * 1000,
    secret: keys.session.cookieKey
}));

router.use(passport.initialize());
router.use(passport.session());

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/profilepics')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().getTime() + '-' + file.originalname)
    }
})

const upload = multer({
    storage,
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

router.get('', async (req, res) => {

    if (!req.user) {
        return res.render('index', { message: 'No cookie found' })
    }
    // res.render('index', { message: `Welcome ${req.user.firstName} ${req.user.lastName}`, image: path.join(__dirname, '../' + req.user.profilePic).replace(new RegExp('\\' + path.sep, 'g'), '/') })
    res.render('index', { message: `Welcome ${req.user.firstName} ${req.user.lastName}`, image: req.user.profilePic })
})

router.get('/login', async (req, res) => {

    res.render('login')
})

router.get('/register', async (req, res) => {
    res.render('register')
})

router.get('/viewall', async (req, res) => {
    const users = await Student.find({}, { __v: 0 })
    res.status(200).send(users)
})

router.get('/upload-avatar', (req, res) => {
    res.render('upload')
})
router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('..')
})

router.get("/google", passport.authenticate("google", {
    scope: ["profile", "email"], failureRedirect: './login'
}));

router.get("/login/google/redirect", passport.authenticate("google", { failureRedirect: '/login', successRedirect: '../../..' }));

router.get('/videos', (req, res) => {
    videos.forEach((element) => {
        element.link = element.link.replace('/v/', '/e/')
    })
    res.render('videos', {
        videos: videos
    })
})
router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), async (req, res) => {
    const { email, password } = req.body
    /* Check if provided email id exists in database or not
    *  If valid save Student data in user constant variable, else render error &*  message */
    try {
        const user = await Student.findOne({ email }, { __v: 0 })
        if (!user)
            res.render('index', {
                message: 'Incorrect credentials'
            })
        // Email id is valid now check if password matches or not
        // If matches log-in user 
        else if (bcrypt.compareSync(password, user.password)) {
            console.log(chalk.black.bgYellow(' Login Success \n'), user);
            res.render('index', { message: 'Login Successfull' })
        }
        // If password matching failed render error message
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
    if (!user) {
        return res.status(500).send('Error registering user')
    }
    //check whether user is already registered or not
    const emailCheck = await Student.findOne({ email: user.email }, { __v: 0 })
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
        console.log(chalk.black.bgYellow(' User Created \n'), student)
        res.render('index', {
            message: 'Account Created Successfully'
        })
    }
    catch (e) {
        console.log(e);
        res.status(500).send(e)
    }
});

router.post('/upload-avatar', upload.single('avatar'), async (req, res) => {

    const oldFile = path.join(__dirname, '../public/' + req.user.profilePic)
    await Student.updateOne({ _id: req.user._id }, {
        $set: {
            profilePic: req.file.path.replace('public\\', '')
        }
    })
    fs.unlink(oldFile, (err) => {
        console.log(oldFile);
        if (err)
            console.log("error deleting old profile pic ");
    })
    //res.file
    res.render('upload', { message: 'File Uploaded Sucessfully' })
})

router.post('/get-avatar', async (req, res) => {
    //check if auth failed, if failed that means user is not signed in
    if (!req.user) {
        return res.render('login', { message: 'Plz login before file upload' })
    }

})

module.exports = router