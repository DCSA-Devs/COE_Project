const express = require('express')
const bcrypt = require('bcryptjs')
const multer = require('multer')
const chalk = require('chalk')
const path = require('path')
const keys = require("../config/keys")
const cookieSession = require("cookie-session");
const passport = require("passport");

// import mongoose models
const Student = require('../mongoose/models/student')

const router = express.Router()
router.use(cookieSession({
    // milliseconds of a day
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));

router.use(passport.initialize());
router.use(passport.session());

const GoogleStrategy = require('passport-google-oauth20').Strategy;
passport.use(
    new GoogleStrategy(
        {
            clientID: keys.google.clientID,
            clientSecret: keys.google.clientSecret,
            callbackURL: "/login/google/redirect"
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                var user = await Student.findOne({ googleID: profile.id }, { __v: 0 })
                if (user) {
                    console.log(chalk.black.bgGreen('User Already Exists'));
                }
                else {
                    user = new Student({
                        googleID: profile.id,
                        email: profile._json.email,
                        firstName: profile.name.givenName,
                        lastName: profile.name.familyName
                    })
                    await user.save()
                    console.log(chalk.black.bgGreen('New User Created'));
                }
            }
            catch (e) {
                done(e, null)
            }
            console.log(user)
            done(null, user)
        })
);
passport.serializeUser((user, done) => {
    done(null, user._id)
})
passport.deserializeUser((id, done) => {
    Student.findById(id, { __v: 0 }).then(user => {
        done(null, user);
    })
})

//config multer
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'avatars/')
    },
    filename: function (req, file, cb) {
        if (req.user)
            cb(null, req.user._id + '.jpg')
        else
            cb('Login before uploading', null)
    }
})

const upload = multer({
    storage: storage
    ,
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
    res.render('index', { message: `Welcome ${req.user.firstName} ${req.user.lastName}` })
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
    scope: ["profile", "email"],
}));

router.get("/login/google/redirect", passport.authenticate("google"), (req, res) => {
    res.redirect('../../..');
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body
    // Check if provided email id exists in database or not
    // If valid save Student data in user constant variable, else render error message
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

// router.post('/upload-avatar', [auth, upload.single('avatar')], async (req, res) => {
//     //check if auth failed, if failed that means user is not signed in
//     // if (!req.user) {
//     //     return res.render('login', { message: 'Plz login before file upload' })
//     // }

//     res.render('upload', { message: 'File Uploaded Sucessfully' })
// })

// router.post('/get-avatar', auth, async (req, res) => {
//     //check if auth failed, if failed that means user is not signed in
//     if (!req.session.user) {
//         return res.render('login', { message: 'Plz login before file upload' })
//     }

//     const imgPath = path.join(__dirname, '../avatars')
//     res.sendFile(imgPath + '\\' + req.session.user._id + '.jpg')
// })

module.exports = router