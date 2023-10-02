const mongoose = require('mongoose');

const Cart =  mongoose.model(
    "Cart",
    new mongoose.Schema({
        idUser:String,
        qty: Number,
        cek:Boolean, default: false,
        namaProduk: String,
        img: String,
        price: Number,
        disc: Number, default: 0,
        namaToko: String,
        kota: String,
    })
     
  )
  
  module.exports = Cart;