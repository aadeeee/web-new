const mongoose = require('mongoose');

const Toko = mongoose.model(
    "Toko",
    new mongoose.Schema({
      img:String,
      namaToko: String,
      kota: String
    })
  )

module.exports = Toko;

