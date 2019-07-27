const express = require('express');
const expressEjsLayouts = require('express-ejs-layouts');
const ejs = require('ejs');
const mongoose = require('mongoose');
const path = require('path')
//Connect Database
const db = mongoose.connection
mongoose.connect('mongodb://localhost:27017/node', { useNewUrlParser: true })
db.once('open', () => {
  console.log('Database Connected')
})
// Mongoose Settings
mongoose.set('useFindAndModify', false)
//Express and EJS setup
const app = express();
app.use(expressEjsLayouts);
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: false }))
//Routing
app.get('/',(req, res) => {
  res.redirect('/posts')
})
app.use('/posts', require('./routes/posts'))

// Connect HTTP
const port = 3000;
app.listen(port, () => {
  console.log(`Your server starting at ${port}`)
})