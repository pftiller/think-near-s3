const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const apiRouter = require('./routes/s3.router')

// Serve static files
app.use(express.static('server/public'));

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Routes
app.use('/apiRouter', apiRouter)

// App Set //
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Listening on port:', port);
  });
  