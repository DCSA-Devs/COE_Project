// import modules
const express = require('express')
const bcrypt = require('bcryptjs')
const fs = require('fs')
const chalk = require('chalk')
const path = require('path')
const cookieSession = require("cookie-session");

// import passport config
const passport = require('../auth/passport');
// import config keys
const keys = require("../config/keys")
// import mongoose models
const Student = require('../mongoose/models/student')
const Video = require('../mongoose/models/videos')

const router = express.Router()
router.use(cookieSession({
    // milliseconds of a day
    maxAge: 24 * 60 * 60 * 1000,
    secret: keys.session.cookieKey
}));

router.use(passport.initialize());
router.use(passport.session());

//auth middleware
const auth = (req, res, next) => {
    if (req.user)
        next()
    else
        res.render('login', { message: 'Login in order to upload' })
}

// import Multer Configs
const uploadVideo = require('../multer/video')
const uploadImage = require('../multer/image')

router.get('', async (req, res) => {
    if (!req.user) {
        return res.render('index', { message: 'No cookie found' })
    }
    res.render('index', { message: `Welcome ${req.user.firstName} ${req.user.lastName}`, image: req.user.profilePic, profileAvailable: req.user.profilePic != undefined ? true : false })
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

router.get('/upload-avatar', auth, (req, res) => {
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

router.get('/videoUp', auth, (req, res) => {
    res.render('videoUp')
})
router.post('/upload-video', uploadVideo.single('videoFile'), async (req, res) => {
    const filePath = req.file.path
    const VideoObject = new Video({
        path: filePath.replace('public\\', ''),
        uploadedBy: req.user._id,
        type: req.body.category
    })
    // save video metadata to database
    try {
        await VideoObject.save()
        res.send('Update Sucessfull')
    }
    // delete saved video if error in uplading video details
    catch (err) {
        fs.unlink(filePath, (err) => {
            console.log(filePath);
            if (err)
                console.log("error deleting old profile pic ", err);
            res.render('index', { message: 'Error Uploading video' })
        })
    }
})
router.get('/watch', async (req, res) => {
    // fetch videos list from database
    const videosFetched = await Video.find({}, { path: 1 })
    console.log(videosFetched);
    res.render('watch', {
        videos: videosFetched
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
            res.redirect('../')
        }
        // If password matching failed render error message
        else
            res.render('index', {
                message: 'Incorrect credentials'
            })
    }
    catch (e) {
        console.log(e);
        res.status(500).render('index', { message: 'Error connecting to Database' })
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
    // save user to the Mongo Database
    try {
        await student.save()
        console.log(chalk.black.bgYellow(' User Created \n'), student)
        res.render('index', {
            message: 'Account Created Successfully'
        })
    }
    catch (e) {
        console.log(e);
        res.status(500).render('index', { message: 'Error registering user' })
    }
});

router.post('/upload-avatar', uploadImage.single('avatar'), async (req, res) => {

    const oldFile = path.join(__dirname, '../public/' + req.user.profilePic)
    // Update oldFilePAth with newFilePath
    try {
        await Student.updateOne({ _id: req.user._id }, {
            $set: {
                profilePic: req.file.path.replace('public\\', '')
            }
        })
    }
    // delete saved image if Mongo return error
    catch (err) {
        const filePath = path.join(__dirname, req.file.path)
        fs.unlink(filePath, (err) => {
            console.log(filePath);
            if (err)
                console.log("error deleting old profile pic ");
        })
    }

    // delete old image when new image is uploaded successfully
    fs.unlink(oldFile, (err) => {
        console.log(oldFile);
        if (err)
            console.log("error deleting old profile pic ");
    })

    res.render('upload', { message: 'File Uploaded Sucessfully' })
})


module.exports = router