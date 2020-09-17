const mongoose = require('mongoose')
const chalk = require('chalk')

mongoose.connect("mongodb+srv://pymongo:123@cluster0.htr68.gcp.mongodb.net/database?retryWrites=true&w=majority", { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .then(() => {
        console.log(chalk.black.bgGreen('Connected to Database Sucessfully'))
    })
    .catch(() => {
        console.log(chalk.black.bgRed('Failed to connect to database make sure your are connected to internet'))
    })