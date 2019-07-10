const express = require('express');

const app = express();

app.use(express.json());

app.set("port", process.env.PORT || 3000);

const server = app.listen(app.get('port'), () => {
    console.log(`Server listening on port ${app.get('port')}...`)
});
module.exports = server;