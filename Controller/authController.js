const AppError = require('./../utils/appError');
const { sendEmail } = require('./../utils/nodemailer');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { v1 } = require('uuid');

const {
  catchAsync,
  sendResponse,
  filterCookie,
  sendToken,
} = require('./../utils/helpers');
const User = require('./../Models/user');

exports.signUp = catchAsync(async (req, res, next) => {
  const { name, email, password, passwordConfirm } = req.body;

  const guestUser = await User.findOne({ email });
  console.log(guestUser);
  if (guestUser && !password && !passwordConfirm) {
    res.status(200).json({
      status: 'guest',
    });
    return;
  }
  if (guestUser && password && passwordConfirm) {
    guestUser.name = name;
    guestUser.password = password;
    guestUser.passwordConfirm = passwordConfirm;
    guestUser.createdAt = new Date();
    guestUser.role = 'user';
    await guestUser.save();
    sendToken(res, guestUser._id, guestUser.name);
    return;
  }
  if (!guestUser && !password && !passwordConfirm) {
    const placeholder = v1();
    await User.create({
      name,
      email,
      password: placeholder,
      passwordConfirm: placeholder,
      role: 'guest',
    });
    res.status(200).json({
      status: 'guest',
    });
    return;
  }
  console.log('signup NEW');
  const user = await User.create({
    name,
    email,
    password,
    passwordConfirm,
    createdAt: new Date(),
  });

  sendToken(res, user._id, user.name);
});
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body);

  if (!email || !password) {
    return next(new AppError('one of the fields is incorrect', 400));
  }

  const user = await User.findOne({
    email,
  }).select('+password');
  //console.log(user);

  if (!user) {
    return next(new AppError('please sign up first', 401));
  }

  const passwordOK = await user.comparePassword(password, user.password);

  if (!passwordOK) {
    return next(new AppError('one of the fields is incorrect', 401));
  }

  // sendResponse(res, 200, { msg: 'ok', data: token });
  sendToken(res, user._id, user.name);
});

exports.protectedRoute = catchAsync(async (req, res, next) => {
  //if jwt is set as authorization header
  // const bearer = req.headers.authorization.split(' ')[1];

  const bearer = filterCookie(req.headers.cookie, 'jwt');
  if (!bearer) {
    return next(new AppError('please log in', 403));
  }

  const verifiedToken = await promisify(jwt.verify)(
    bearer,
    process.env.JWT_SECRET
  );
  //console.log(verifiedToken);
  const user = await User.findById(verifiedToken.id).select([
    '+role',
    '+email',
    '-_id',
    '-__v',
    '-createdAt',
  ]);

  if (!user) {
    return new AppError('There is an error please login or sign up', 401);
  }
  const passwordChanged = user.changedPassword(verifiedToken.exp);

  if (passwordChanged) {
    return next(new AppError('please login again', 401));
  }
  user.passwordChangedAt = undefined;
  req.user = user.role;
  next();
});

exports.restrictTo = (...args) => (req, res, next) => {
  const verifiedUser = [...args].filter((u) => u === req.user);
  if (verifiedUser.length === 0) {
    return next(new AppError('please contact your admin for access', 401));
  }

  next();
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({
    email,
  });

  if (!user) {
    return next(new AppError('There is no user with email address.', 404));
  }

  const token = user.createForgotPasswordToken();
  await user.save({
    validateBeforeSave: false,
  });

  const html = `<h2>as requested here is your link to reset your password</h2>
  <br>
  <p>please click at the link below to create a new password</p>
  <br>
  <a href='/signin/resetPassword/${token}'><p>reset my password</p></a>`;
  let mailresponse;
  try {
    mailresponse = await sendEmail(email, 'here is your reset token', html);
  } catch (error) {
    if (error) {
      user.passwordResetToken = undefined;
      user.passwordResetTokenExpires = undefined;

      await user.save({
        validateBeforeSave: false,
      });

      return next(
        new AppError(
          'something went wrong to send the email, please try again',
          500
        )
      );
    }
  }

  sendResponse(res, 200, 'ok');
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const { password, passwordConfirm } = req.body;
  //console.log(req.body);
  const hashedToken = crypto
    .createHmac('sha256', process.env.CRYPTO_SECRET)
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetTokenExpires: {
      $gt: Date.now(),
    },
  });

  //console.log(user, 'password change');
  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }

  user.password = password;
  user.passwordConfirm = passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetTokenExpires = undefined;
  user.passwordChangedAt = Date.now();
  await user.save();

  sendToken(res, user._id, null);
});

exports.changePassword = catchAsync(async (req, res, next) => {
  const { email, password, passwordConfirm } = req.body;

  if (password !== passwordConfirm) {
    return next(new AppError('please make sure both passwords are equal', 401));
  }

  const user = await User.findOne({ email: email }).select('+password');

  const passwordOK = await user.comparePassword(password, user.password);

  if (!passwordOK) {
    return next(new AppError('one of the fields is incorrect', 401));
  }

  user.password = password;
  user.passwordConfirm = passwordConfirm;
  user.passwordChangedAt = Date.now();

  await user.save();

  sendToken(res, user._id, null);
});

exports.verifyToken = catchAsync(async (req, res, next) => {
  console.log('SERVER');
  const { token } = req.body;
  console.log(req.body, 'BODY');

  if (!token) {
    return new AppError('please login or sign up', 401);
  }

  const verifiedToken = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );
  const isValid =
    (verifiedToken.exp - verifiedToken.iat) / 60 <= 0 ? 'error' : 'ok';
  // sendToken(res, user_id, 3);
  res.status(200).json({ status: isValid });
});
