require('express-async-errors');
const express = require('express');

const app = express();


require('./server/startup/routes')(app)

app.set("port", process.env.PORT || 3000);

const server = app.listen(app.get('port'), () => {
    console.log(`Server listening on port ${app.get('port')}...`)
});
module.exports = server; 