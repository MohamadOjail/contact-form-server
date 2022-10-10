require("dotenv").config();
const express = require("express");
const appRouter = require('./routes/appRoutes');
const mailRouter = require('./routes/mailRoutes')

// create the express app
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

// start listening
app.listen(port, () => {
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
        server_test: '/api/app/test',
        server_status: '/api/app/info',
        contact_mail_post: '/api/server/contact'
    })
})
app.use('/api/app', appRouter);
app.use('/api/server', mailRouter);
