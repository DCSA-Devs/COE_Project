const express = require('express')
const path = require('path')
const bcrypt = require('bcryptjs')


require('./mongoose/mongoose')

// import mongoose models
const Student = require('./mongoose/models/student')

const app = express()

app.use(express.urlencoded());
app.use(express.json());

const publicDirectoryPath = path.join(__dirname, './public')
app.use(express.static(publicDirectoryPath))


app.post('/', async (req, res) => {
    // Hashing the password
    const hash = bcrypt.hashSync(req.body.user.password, 8)
    req.body.user.password = hash
    const student = new Student(req.body.user)
    try {
        await student.save()
        console.log(student);
        res.status(201).send(student)
    }
    catch (e) {
        console.log(e);
        res.status(500).send(e)
    }
});

app.listen(3000, () => {
    console.log('Running at port 3000');
})