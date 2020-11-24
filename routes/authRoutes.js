const Router = require('express');
const router = Router();
const {
  signUp,
  login,
  protectedRoute,
  forgotPassword,
  resetPassword,
  changePassword,
  verifyToken,
} = require('./../Controller/authController');

router.route('/resetPassword/:token').patch(resetPassword);

router.route('/signup').post(signUp);
router.route('/login').post(login);
router.route('/forgotPassword').post(forgotPassword);
router.route('/verify').post(verifyToken);

router.use(protectedRoute);
router.route('/changePassword').patch(changePassword);
//router.route('/protected').get(protectedRoute);

module.exports = router;
