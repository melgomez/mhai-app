require('express-async-errors');
const express = require('express');
const config = require('config');
// const router = express.Router();
const layout = require('express-ejs-layouts');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const auth = require('./server/middleware/passport')

const app = express();

require('./server/startup/db')();
require('./server/startup/routes')(app);
// require('./server/middleware/passport')(passport);
app.post('/', auth, (req, res, next) => {
    console.log(req.body)
    res.send('Something Came Up')
});

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'server/views/pages'));

app.set('view engine', 'ejs');
app.use( layout );

app.use(express.static('public'));


// Authentication Process

// app.use(session({
//     secret: 'sometextgoeshere',
//     saveUninitialized: true,
//     resave: true,
//     store: new MongoStore({
//         url: config.get('db'),
//         collection: 'sessions'
//     })
// }));


// Passport Initialization
app.use(passport.initialize());
app.use(passport.session());

// Homepage Route
app.get('/', (req, res) => {
    res.render('login', {title: 'Express from Server Folder'})
});
const server = app.listen(app.get('port'), () => {
    console.log(`Server listening on port ${app.get('port')}...`)
});

module.exports = server; 