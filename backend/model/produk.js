const mongoose = require('mongoose');

const Produk =  mongoose.model(
  "Produk",
  new mongoose.Schema({
      idToko: String,
      namaProduk: String,
      img: String,
      price: Number, default: 0,
      disc: Number,
      kategori:String,
      deskripsi: String,
      jenis: String
  })
   
)

module.exports = Produk;

