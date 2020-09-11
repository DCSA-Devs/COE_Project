const { MongoClient } = require('mongodb')
const express = require('express')
const path = require('path')
//connection string
const app = express()

const connString = "mongodb+srv://pymongo:123@cluster0.htr68.gcp.mongodb.net/database?retryWrites=true&w=majority"


// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
const publicDirectoryPath = path.join(__dirname, './public')
app.use(express.static(publicDirectoryPath))
console.log(__dirname, publicDirectoryPath);
// Access the parse results as request.body

app.post('/', (request, response) => {
    console.log(request.body.user);
    MongoClient.connect(connString, { useNewUrlParser: true }, (error, client) => {
        if (error) {
            return console.log(error);
        }
        const db = client.db('test')
        const student = db.collection('student')
        student.insertOne(request.body.user)
    })
});
app.listen(3000, () => {
    console.log('Running at port 3');
})