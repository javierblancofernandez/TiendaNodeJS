const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const routesV1 = require('./routes/v1');

dotenv.config();

const app = express();

//console.log('MONGO', process.env.MONGO);

// parse application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

routesV1(app);

const { PORT } = process.env || 4000;

mongoose
  .connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('conectado a la base de datos MONGODB');
    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`running on ${PORT}`);
    });
  })
  .catch(error => {
    console.log('mongodb error', error);
  });
