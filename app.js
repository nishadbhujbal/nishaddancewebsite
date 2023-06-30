const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require("body-parser");
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');
}
const port = 8000;

// DEFINE MONGOOSE SCHEMA
const contactSchema = new mongoose.Schema({
    name: String,
    phone_number: String,
    email: String,
    address: String,
    concern: String
});

const Contact = mongoose.model('Contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static(path.join(__dirname, 'static'))); // For serving static files
app.use(express.urlencoded({ extended: true }));


// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the view directory

// ENDPOINTS
app.get('/', (req, res) => {
    const params = {}
    res.status(200).render('home', params)
})
app.get('/contact', (req, res) => {
    const params = {}
    res.status(200).render('contact', params)
})

app.post('/contact', (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(() => {
        res.send("This item has been saved to the databse")
    }).catch(() => {
        res.status(400).send("Item was not saved to the database")
    })
    // res.status(200).render('contact')
})

// START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`)
})