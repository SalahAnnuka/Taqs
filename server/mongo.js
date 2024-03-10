const { MongoClient } = require("mongodb");

const client = new MongoClient('mongodb+srv://smohammadannuka:alimurad@cluster0.gymtp4t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

client.connect()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(error => {
    console.error("Error connecting to MongoDB:", error);
  });

module.exports = client.db('db1').collection('users');