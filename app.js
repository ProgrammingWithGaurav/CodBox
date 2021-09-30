if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const mongoose = require('mongoose')
const Code = require('./models/code.js')
const app = express()

// connect to the mongo database
mongoose.connect(process.env.DATABASE_URL,
    { useNewUrlParser: true })

// middlewares
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use(express.static('public'))

// ROUTERS
// - /
app.get('/', (req, res)=>{
    res.redirect('/codebox')
})

// - /codebox
app.get('/codebox', (req, res)=>{
    res.render('index', { title: 'Code Box'})
})

// - /create
app.get('/create', (req, res)=>{
    res.render('create', { title: 'Create your Code Box' })
})

// POST request - /codeBoxes
app.post('/codeBoxes', (req, res) => {
    const code = new Code(req.body);

    code.save()
        .then(result => {
            res.redirect('/boxes');
        })
        .catch(err => {
            console.log(err);
        });
});

// displaying all the code boxes
// - /boxes
app.get('/boxes', (req, res)=>{
    Code.find().sort({ createdAt: -1 })
    .then(result => {
        res.render('boxes', { code: result, title: 'All Code Boxes' });
    })
    .catch(err => {
        console.log(err);
    })
})

// router for if the user click on any code box 
// - /details
app.get('/details/:id', (req, res)=>{
    const id = req.params.id;
    Code.findById(id)
        .then(result => {
            res.render('details', { code: result, title: 'code Details' });
        })
        .catch(err => {
            res.render('404', { title: '404 Page not found' })
        });
})

app.get('/about', (req, res)=>{
    res.render('about', { title: 'About' })
})

app.listen(process.env.PORT || 3000)

app.use((req, res)=>{
    res.render("404", { title: '404 Page not found'})
})