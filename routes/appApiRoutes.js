const Router = require('express');
const {
  getProductsByFolder,
  getProductsByQuery,
  verifyTheBasket,
  checkoutWithStripe,
} = require('../Controller/appApiController');

const router = Router();

router.route('/getImages').get(getProductsByFolder);
router.route('/prods').get(getProductsByQuery);
router.route('/checkprods').post(verifyTheBasket);
router.route('/create-stripe-payment-intent').post(checkoutWithStripe);
module.exports = router;
