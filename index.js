require('express-async-errors');
require('./config/passport');
const express = require('express');
const config = require('config');
// const router = express.Router();
const layout = require('express-ejs-layouts');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
// const auth = require('./server/middleware/passport')

const app = express();


require('./config/passport')(passport);
app.use(session({
    secret: 'sometextgoeshere',
    saveUninitialized: true,
    resave: true,
    store: new MongoStore({
        url: config.get('db'),
        collection: 'sessions'
    })
}));


// Passport Initialization
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');
app.use( layout );
require('./server/startup/db')();
require('./server/startup/routes')(app);


app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'server/views/pages'));




app.use(express.static('public'));


// Authentication Process



// Homepage Route
app.get('/', (req, res) => {
    res.render('login', {title: 'Express from Server Folder'})
});

app.get('/me', async (req, res) => {
    if(!req.isAuthenticated()) {
        res.send("Unauthorized")
    } else {
        res.send(req.user.username + ' is logged in.')
        // res.send(req.session.id)
    }
})

const server = app.listen(app.get('port'), () => {
    console.log(`Server listening on port ${app.get('port')}...`)
});

module.exports = server; 