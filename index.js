require('express-async-errors');
const express = require('express');
// const router = express.Router();
const layout = require('express-ejs-layouts');
const path = require('path');

const app = express();


require('./server/startup/routes')(app);

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'server/views/pages'));

app.set('view engine', 'ejs');
app.use( layout );
// Homepage Route

app.get('/', (req, res) => {
    res.render('index', {title: 'Express from Server Folder'})
});

const server = app.listen(app.get('port'), () => {
    console.log(`Server listening on port ${app.get('port')}...`)
});

module.exports = server; 