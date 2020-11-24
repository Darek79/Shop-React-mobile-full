const { sendResonse } = require('./../utils/helpers');
const AppError = require('./../utils/appError');

const sendDevErrors = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};
const sendProdErrors = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error(err, 'ERROR');

    res.status(500).json({
      status: 'error',
      message: 'something went wrong',
    });
  }
};

const mongoErrorValidation = (err) => {
  const arr = Object.values(err.errors).map((el) => el.message);
  return new AppError(
    `following fields must be corrected, ${arr.join(' and ')}`,
    500
  );
};
const mongoErrorDuplicate = (err) => {
  let ind = err.message.indexOf('{');
  ind = err.message.substring(ind, err.message.length);
  let str = ind.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
  return new AppError(`duplicated fields at:${str}`, 500);
};
const JWTerror = (err) => {
  return new AppError('please log in', 401);
};
const JWTerrorExp = (err) => {
  return new AppError('your token has expired, please login again', 401);
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'DEVELOPMENT') {
    sendDevErrors(err, res);
  }
  if (process.env.NODE_ENV === 'PRODUCTION') {
    let error = { ...err };
    if (err.message.includes('Product validation failed')) {
      error = mongoErrorValidation(err);
    }
    if (err.message.startsWith('E11000')) {
      error = mongoErrorDuplicate(err);
    }
    if (err.name === 'JsonWebTokenError') {
      error = JWTerror(err);
    }
    if (err.name === 'TokenExpiredError') {
      error = JWTerrorExp(err);
    }

    sendProdErrors(error, res);
  }
};
// "DEVELOPMENT"
// "PRODUCTION"
