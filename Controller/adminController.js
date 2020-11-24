const fs = require('fs');
const path = require('path')
const Product = require('./../Models/product');
const AppError = require('./../utils/appError');
const {createOneProduct}= require('./../utils/handlerFactory');

exports.sendLoginPage=(req,res,next)=>{
  res.status(200).sendFile(path.join(__dirname,'..','public','index2.html'))
}
exports.sendUploadPage=(req,res,next)=>{
  res.status(200).sendFile(path.join(__dirname,'..','public','index.html'))
}

exports.uploadProduct=createOneProduct(Product);