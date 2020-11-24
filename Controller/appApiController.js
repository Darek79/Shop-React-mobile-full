const { verify } = require("jsonwebtoken");
const Product = require("./../Models/product");
const {
  sendImagesInFolder,
  sendImagesByQuery,
  verifyBasket,
  stripeCheckout
} = require("./../utils/handlerFactory");

exports.getProductsByFolder = sendImagesInFolder(Product);
exports.getProductsByQuery = sendImagesByQuery(Product);
exports.verifyTheBasket = verifyBasket(Product);
exports.checkoutWithStripe= stripeCheckout();