
const passport = require('passport')
const keys = require('../config/keys')
const Student = require('../mongoose/models/student')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const chalk = require('chalk')
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

module.exports = passport