const jwt = require('jsonwebtoken');

exports.catchAsync = (fn) => {
  return (req, res, next) => fn(req, res, next).catch(next);
};
exports.filterCookie = (cookies, cName, cName1) => {
  if (cookies === undefined) {
    return false;
  }
  // if(!cookies.includes('Bearer')){
  //   return false
  // }

  return cookies
    .split(';')
    .filter((c) => c.includes(cName))
    .toString()
    .replace(cName1 || cName + '=', '')
    .trim();
};

exports.sendToken = (res, user, name) => {
  const token = jwt.sign(
    {
      id: user,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );

  console.log(token);
  // res.cookie('jwt', token, {
  //   expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * days),
  //   httpOnly: true,
  // });

  res.status(200).json({
    status: 'ok',
    data: token,
    name
  });
};

exports.sendResponse = (res, code, status, data) => {
  res.status(code).json(data);
};
