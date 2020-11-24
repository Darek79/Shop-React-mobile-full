const { Schema, model } = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'please provide a username'],
    minlength: [4, 'username should have min 4 characters'],
    unique: [true, 'username is already taken'],
  },
  email: {
    type: String,
    required: [true, 'we need your email to proceed'],
    lowercase: true,
    validate: [validator.isEmail, 'please provide an valid email'],
  },
  password: {
    type: String,
    required: [true, 'please provide a password'],
    minlength: 5,
    select: false,
  },
  role: {
    type: String,
    default: 'user',
  },
  passwordConfirm: {
    type: String,
    validate: {
      validator: function (el) {
        return this.password === el;
      },
      message: 'passwords are not matching',
    },
    required: [true, 'please repeat your password'],
  },
  createdAt: {
    type: Date,
  },
  passwordChangedAt: {
    type: Date,
  },
  passwordResetToken: String,
  passwordResetTokenExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre(/^find/,function (next) {
  
    this.find({active:{$ne:false}});
  next();
})

userSchema.methods.comparePassword = async function (dbPassword, received) {
  return await bcrypt.compare(dbPassword, received);
};

userSchema.methods.changedPassword = function (exp) {
  let restTime = false;

  if (this.passwordChangedAt) {
    restTime = Math.floor((exp - this.passwordChangedAt.getTime() / 1000) / 60);
    return restTime <= 1;
  }

  return restTime;
};


userSchema.methods.createForgotPasswordToken = function () {
  const token = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHmac('sha256', process.env.CRYPTO_SECRET)
    .update(token)
    .digest('hex');

  this.passwordResetTokenExpires = Date.now() + 15 * 60 * 1000;
  console.log(token, 'token');
  return token;
};
const User = model('UserShop', userSchema);
module.exports = User;
