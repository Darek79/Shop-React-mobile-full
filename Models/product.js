const { Schema, model } = require('mongoose');

const productSchema = new Schema({
  title: {
    type: String,
    required: [true, 'a product need a name'],
    minlength: [5, 'a product title must be longer then 5 characters'],
    unique: true,
    trim: true,
  },
  folder: {
    type: String,
    required: [true, 'please add a folder name'],
    trim: true,
  },
  description: {
    type: String,
    required: true,
    minlength: [5, 'a product title must be longer then 5 characters'],
  },
  details: {
    type: String,
    required: true,
    minlength: [5, 'product details must be longer then 5 characters'],
  },
  category: {
    type: String,
    required: true,
  },
  subcategory: {
    type: String,
    required: true,
  },
  artcategory: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
    minlength: [3, 'a brand description must be longer then 3 characters'],
  },
  size: {
    type: [String],
    default: ['XS', 'S', 'M', 'L', 'XL'],
  },
  price: {
    type: Number,
    set: (val) => val.toFixed(2),
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  rating: {
    type: Number,
    default: 0,
  },
  photos: [String],
  wasVisited: {
    type: Number,
    default: 0,
  },
});

productSchema.index({
  category: 1,
  subcategory: 1,
  id: 1,
});

productSchema.pre('save', function (next) {
  if (this.subcategory === 'shoe') {
    this.size = ['36', '37', '38', '39', '40', '41'];
  }
  next();
});
productSchema.pre('save', function (next) {
  this.photos = this.photos.map((ph) => {
    return ph.replace(/\\/g, '/').substr(8, ph.length);
  });
  next();
});

// productSchema.methods.verifyInDB=function(arr){

// }

const Product = model('Product', productSchema);
module.exports = Product;
