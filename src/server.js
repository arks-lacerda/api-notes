//import the express
require('express-async-errors');
const migrationsRun = require('./database/sqlite/migrations');
const AppError = require('./utils/AppError');
const uploadConfig = require('./configs/upload');

const cors = require('cors');
const express = require('express');

const routes = require('./routes');
migrationsRun();

// inicialize express
const app = express();
app.use(cors());

//read request body in json by express
app.use(express.json());

app.use('/files', express.static(uploadConfig.UPLOADS_FOLDER));

app.use(routes);

app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }

  console.log(error);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

// set the port
const PORT = 3333;

// keep listening to the port
app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
