require("dotenv").config();
const express = require("express");
const appRouter = require('./routes/appRoutes');
const mailRouter = require('./routes/mailRoutes')

// create the express app
const app = express();
const port = 4000;

app.use(express.json());

// start listening
app.listen(port, () => {
    console.log('Listening on:', `http://localhost:${port}`);
});

// set cors
app.use((req, res, next) => {
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
