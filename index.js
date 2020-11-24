const express = require('express');
var cors = require('cors');
const path = require('path');
require('dotenv').config();
const app = express().use('*', cors());

process.on('uncaughtException', (err) => {
  console.log({
    ERROR_NAME: err.name,
    ERROR_MESSAGE: err.message,
    ERROR_STACK: err.stack,
  });
  process.exit(1);
});

const { dbConnect } = require('./db');
const globalErrorHandler = require('./Controller/errorController');

//Routes
const adminRoutes = require('./routes/adminRoute');
const appApiRoutes = require('./routes/appApiRoutes');
const authRoutes = require('./routes/authRoutes');
const { login, protectedRoute } = require('./Controller/authController');

dbConnect();
//Server accepts CORS

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, authorization'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/assets', express.static(path.join(__dirname, 'public', 'img')));
//app.use("/login", express.static(path.join(__dirname, "public", "index2.html")));

app.get('/', (req, res, next) => {
  res.redirect('/admin/login');
});
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));
app.use('/admin', adminRoutes);

// app.use(express.static(path.join(__dirname, "public", "index.html")));

app.use('/api', appApiRoutes);
app.use('/signin', authRoutes);

app.get('*', (req, res, next) => {
  res.status(200).send(`<h2>this page doesnt exist</h2>
    return via this link: <a href="/">homepage</a>
  `);
});

app.use(globalErrorHandler);

const server = app.listen(3000, () => console.log(`server is up`));

process.on('unhandledRejection', (err) => {
  console.log({
    ERROR_NAME: err.name,
    ERROR_MESSAGE: err.message,
    ERROR_STACK: err.stack,
  });
  server.close(() => process.exit(1));
});
