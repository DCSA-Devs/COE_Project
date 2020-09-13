const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://pymongo:123@cluster0.htr68.gcp.mongodb.net/database?retryWrites=true&w=majority", { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
)