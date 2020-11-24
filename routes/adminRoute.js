const {Router}= require('express');
const {sendUploadPage,sendLoginPage,uploadProduct}=require('../Controller/adminController');
const {protectedRoute,restrictTo} = require('./../Controller/authController');
const { upload } = require('./../multer');
const router = Router();

router.route('/login').get(sendLoginPage);
router.route('/upload').get(protectedRoute,restrictTo('admin'),sendUploadPage);
router.route('/productUpload').post(upload.array('photos',3),uploadProduct);

module.exports = router;