
const passport = require('passport')
const keys = require('../config/keys')
const Student = require('../mongoose/models/student')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy
const chalk = require('chalk')
const bcrypt = require('bcryptjs')
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
},
    async function (usernameField, passwordField, done) {
        console.log(usernameField);
        const user = await Student.findOne({ email: usernameField })
        if (!user)
            return done(null, false, { message: 'Incorrect email or password.' })
        if (bcrypt.compareSync(passwordField, user.password))
            done(null, user)
        else
            return done(null, false, { message: 'Incorrect email or password.' }
            )
    }))
passport.use(
    new GoogleStrategy(
        {
            clientID: keys.google.clientID,
            clientSecret: keys.google.clientSecret,
            callbackURL: "/login/google/redirect"
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                console.log(chalk.black.bgGreen('Data Send By Google'));
                console.log(profile);
                var user = await Student.findOne({ googleID: profile.id }, { __v: 0 })
                if (user) {
                    console.log(chalk.black.bgGreen('User Already Exists'));
                }
                else {
                    user = new Student({
                        googleID: profile.id,
                        email: profile._json.email,
                        firstName: profile.name.givenName,
                        lastName: profile.name.familyName,
                        profilePic: profile._json.picture
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

module.exports = passport