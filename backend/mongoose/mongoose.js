const mongoose = require('mongoose')
const chalk = require('chalk')
const keys = require('../config/keys')
mongoose.connect(keys.mongodb.dbURI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .then(() => {
        console.log(chalk.black.bgGreen('Connected to Database Sucessfully'))
    })
    .catch(() => {
        console.log(chalk.black.bgRed('Failed to connect to database make sure your are connected to internet'))
    })