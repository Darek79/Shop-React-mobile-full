const { catchAsync, sendResponse } = require('./helpers');
const Product = require('./../Models/product');
const AppError = require('./appError');
const ApiFeatures = require('./APIfeatures');
const stripe = require('stripe')(process.env.STRIPE_SECRET);
exports.createOneProduct = (Model) => {
  return catchAsync(async (req, res, next) => {
    const {
      productTitle,
      productFolder,
      productDescription,
      productDetails,
      productCategory,
      productBrand,
      subCategory,
      artCategory,
      productPrice,
    } = req.body;
    const imageArray = await req.files.map((el) => {
      let ind = el.path.indexOf('uploads');
      return el.path.substring(ind - 1, el.path.length);
    });

    const r = await Model.create({
      title: productTitle,
      folder: productFolder,
      description: productDescription,
      details: productDetails,
      category: productCategory.toLowerCase(),
      subcategory: subCategory.toLowerCase(),
      artcategory: artCategory.toLowerCase(),
      brand: productBrand,
      price: parseFloat(productPrice),
      id: req.files.id,
      photos: imageArray,
    });

    sendResponse(res, 200, 'ok', r);
  });
};

exports.sendImagesInFolder = (Model) => {
  return catchAsync(async (req, res, next) => {
    const apiF = new ApiFeatures(Model.find(), req.query)
      .filtering()
      .folder()
      .sorting()
      .limit()
      .pagination();

    const query = await apiF.query;

    sendResponse(res, 200, 'ok', query);
  });
};

exports.sendImagesByQuery = (Model) => {
  return catchAsync(async (req, res, next) => {
    console.log(req.query);

    const apiF = new ApiFeatures(Model.find(), req.query)
      .filtering()
      .folder()
      .category()
      .sorting()
      .limit()
      .pagination();

    const query = await apiF.query;

    if (query.length === 0) {
      return next(new AppError('please try it later', 500));
    }

    sendResponse(res, 200, 'ok', query);
  });
};

exports.verifyBasket = (Model) => {
  return catchAsync(async (req, res, next) => {
    const data = req.body;
    console.log('-->BASKET ON SERVER ');
    if (!Array.isArray(data)) {
      return new AppError('sorry something went wrong', 500);
    }
    const idArr = data.map((item) => item.id);
    const prodsToCheck = await Model.find().where('id').in(idArr).exec();

    const newBasketArray = data.map((prod, i) => {
      let checked = false;
      prodsToCheck.map((item) => {
        if (
          item.id === prod.id &&
          item.price === prod.price &&
          item.price * prod.qty === prod.val
        ) {
          checked = true;
        }
      });
      if (checked) {
        checked = false;
        return prod;
      } else {
        return data.splice(i, 1);
      }
    });
    res.status(200).json(newBasketArray);
  });
};

exports.stripeCheckout = () => {
  return catchAsync(async (req, res, next) => {
    console.log('STRIPE PAYTMENT');
    const { total, currency } = req.body;
    const t = total * 1;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(t.toFixed(2) * 100),
      currency: 'pln',
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  });
};
