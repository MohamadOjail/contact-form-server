require("dotenv").config();
const https = require('https');
const path = require('path');
const fs = require('fs');
const express = require("express");
const appRouter = require('./routes/appRoutes');
const mailRouter = require('./routes/mailRoutes')

// create the express app
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

const credentials = {
    key: fs.readFileSync('/etc/letsencrypt/live/contact.ojail.online/privkey.pem', 'utf8'),
    cert: fs.readFileSync('/etc/letsencrypt/live/contact.ojail.online/fullchain.pem', 'utf8')
};

const server = https.createServer(credentials, app);

// start listening
server.listen(port, () => {
    console.log('Listening on:', `http://localhost:${port}`);
});

// set cors
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

// manage http requests to the API
app.get('/', (req, res) => {
    res.status(200).json({
        Server_Test: {
            Method: 'GET',
            Request_URL: 'https://contact.ojail.online/api/app/test'
        },
        Server_Status: {
            Method: 'GET',
            Request_URL: 'https://contact.ojail.online/api/app/info'
        },
        Contact_Function: {
            Method: 'POST',
            Request_URL: 'https://contact.ojail.online/api/server/contact',
            Request_Body_example: {
                "name": "sender name",
                "message": "this is a message!",
                "email": "bla.bla@foo.org"
            }
        }
    })
})
app.use('/api/app', appRouter);
app.use('/api/server', mailRouter);
