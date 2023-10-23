const express = require('express');
const { model } = require('mongoose');
const router = express.Router()
const Toko = require("./model/toko");
const barang = require("./model/produk");
const Cart = require("./model/cart")
const User = require('./model/user')
var jwt = require("jsonwebtoken");
const config = require("./jwt/authjwt");
const auth = require("./jwt/verify")
// Toko.insertMany([
//     {
//        "img": "https://drive.google.com/uc?export=view&id=12jAbe2LnV11ten5rb37ynRCV9gHiy31o",
//         "namaToko": "WERS",
//         "kota": "Bandung"
//     },
//     {
//        "img": "https://drive.google.com/uc?export=view&id=1mBOPqy6ILAXz2ETUX_T3UXS1ASCx1yVQ",
//         "namaToko": "Signx",
//         "kota": "Medan"
//     },
//     {
//        "img": "https://drive.google.com/uc?export=view&id=1iP1rmuhMb7M7DgQ53k8vX9N1BJ5YKxKk",
//         "namaToko": "Colorby",
//         "kota": "Jakarta"
//     },
//     {
//        "img": "https://drive.google.com/uc?export=view&id=1vSMXdrdViSahUNJrISKGR9VuPmNNZuJe",
//         "namaToko": "BigBoy",
//         "kota": "Padang"
//     },
//     {
//        "img": "https://drive.google.com/uc?export=view&id=1m-XPNNUHNWP61KY6LGWiZaNFUQNs-5lc",
//         "namaToko": "FLY",
//         "kota": "Semarang"
//     },
//     {
//        "img": "https://drive.google.com/uc?export=view&id=1LlfRJW3MjHQksSV-WzdJKOrwo85tWElz",
//         "namaToko": "Gogoki",
//         "kota": "Bekasi"
//     },
//     {
//        "img": "https://drive.google.com/uc?export=view&id=1wFZpW-edpuyRlXGV2AM5aP3fwkWIbbbi",
//         "namaToko": "TokoTok",
//         "kota": "Langsa"
//     },
//     {
//        "img": "https://drive.google.com/uc?export=view&id=1j-rs2bXuUCUIRWqHKZouO-L0NHA7Xt0z",
//         "namaToko": "MallKU",
//         "kota": "Sukabumi"
//     },
//     {
//        "img": "https://drive.google.com/uc?export=view&id=1nwD4Q1CtAAgS91ser5_bCgxrxs0uscbh",
//         "namaToko": "YesShop",
//         "kota": "Depok"
//     },
//     {
//          "img": "https://drive.google.com/uc?export=view&id=1iP1rmuhMb7M7DgQ53k8vX9N1BJ5YKxKk",
//         "namaToko": "LuckyGirl",
//         "kota": "Kisaran"
//     },
//     {
//        "img": "https://drive.google.com/uc?export=view&id=11NFfh6OVHAFyv-qVQBDgCie951nd1-r0",
//         "namaToko": "SiapKaya",
//         "kota": "Sidikalang"
//     },
//     {
//        "img": "https://drive.google.com/uc?export=view&id=1t2eq0jvf1iCtfeR__6TvbWIrVxV9JzOe",
//         "namaToko": "GoalStore",
//         "kota": "Sipirok"
//     }

// ])

// barang.insertMany([
//     {
//         idToko: "63d0d4544de14b676e9173ec",
//         namaProduk: "Baju Silat",
//         img: "https://drive.google.com/uc?export=view&id=1dT9nxQE7pgq54KKItbWwRFy4T0PvT-rL",
//         price: 120000,
//         disc: 0,
//         kategori:"Fashion",
//         deskripsi: "Bahan Katun Bestway\nNyaman dipakai\nKancing baju Full batok\nSaku baju Kanan & Kiri\n📸 Foto yang kami ambil real pict 👍"
//     },
//     {
//         idToko: "63d0d4544de14b676e9173ec",
//         namaProduk: "Baju Tidur",
//         img: "https://drive.google.com/uc?export=view&id=1MuYvtic2atJBgLXWR9bih77ynE15S8Uf",
//         price: 100000,
//         disc: 0,
//         kategori:"Fashion",
//         deskripsi: "Siapa nih yang di rumah aja tapi pengen tetep trendy? yang mau hangout bareng temen tetep homy tapi kece? THISSS BUNDD!! Piyama keren, cuttingannya bikin nyaman dipake seharian."
//     },
//     { 
//         idToko: "63d0d4544de14b676e9173ed",
//         namaProduk: "Helm Bogo",
//         img: "https://drive.google.com/uc?export=view&id=1O6QAc3XZs81yKMvGTQy0XufmGV6hOtdf",
//         price: 140000,
//         disc: 0,
//         kategori:"Aksesoris",
//         deskripsi: "-Produk Sudah SNI\nAll Size Ukuran Dewasa\nBatok Helm Buatan Pabrik\nBahan Kulit Sintetis\nSudah termasuk kaca\nready stok langsung order saja"
//     },
//     {
//         idToko: "63d0d4544de14b676e9173ed",
//         namaProduk: "Helm Kyt",
//         img: "https://drive.google.com/uc?export=view&id=1tOEbT6I76WIEGJYNn-FSylRUx8t4cglR",
//         price: 140000,
//         disc: 0,
//         kategori:"Aksesoris",
//         deskripsi: "Merupakan helm half face yang didesain dengan paint motif grafis yang trendy & memiliki double visor. Helm open face ini dirancang dengan anti scratch resistant, micrometrically safety buckle, berstandarisasi DOT & SNI 1811-2007, serta bagian dalam helm yang mudah dilepas dan mudah untuk dicuci, sehingga dapat memberikan keamanan pada saat berkendara sehari-hari."
//     },
//     {
//         idToko: "63d0d4544de14b676e9173ee",
//         namaProduk: "Case Hp",
//         img: "https://drive.google.com/uc?export=view&id=1FLB0_ov9dj2Q6aepEMrl3ljKWyNO1Rhj",
//         price: 30000,
//         disc: 2000,
//         kategori:"Aksesoris",
//         deskripsi: "Costum case lucu dengan desain yang aesthetic serta memiliki bentuk yang persisi sehingga memberikan akses yang mudah ke semua tombol dan port\nMaterial Casing berkualitas tinggi memberikan perlindungan maksimal dari debu, kotoran, goresan, dan benturan.Dengan menggunakan mesin UV teknologi Japan membuat hasil print tajam dan tahan lama"
//     },
//     {
//         idToko: "63d0d4544de14b676e9173ee",
//         namaProduk: "Binder",
//         img: "https://drive.google.com/uc?export=view&id=1FIlVrfS43JfKKSDspyz5YoelMNxkWJCk",
//         price: 15000,
//         disc: 0,
//         kategori:"Aksesoris",
//         deskripsi: "- Terbuat dari material kulit sintetis premium. Bukan bahan jeruk ya, jadi kualitas lebih tebal\nREADY 24/7\nDi pack dengan BUBBLE WRAP dan PLASTIK GRATIS TANPA BIAYA TAMBAHAN, namun jika ingin menambah keamanan paket silahkan beli bubble wrap tambahan pada link berikut ini: https://www.tokopedia.com/mvpbag/bubble-wrap-tambahan-packing-packaging-aman\nSudah melalui QC (pengecekan) ring besi, magnet, dan keseluruhan sebelum dikirim\nLink Loose Leaf: https://www.tokopedia.com/mvpbag/loose-leaf-garis-a5-b5-kertas-file-isi-binder-100-lembar-berkualitas-a5-garis\nLink Pembatas Binder: https://www.tokopedia.com/mvpbag/pembatas-binder-divider-interx-rainbow-a5-b5-20-ring-26-ring-original"
//     },
//     {
//         idToko: "63d0d4544de14b676e9173ef",
//         namaProduk: "Notebook",
//         img: "https://drive.google.com/uc?export=view&id=1zkPpgEM05Nsv2GHBUyzG3O1BqjeWcf-G",
//         price: 3000000,
//         disc: 0,
//         kategori:"Aksesoris",
//         deskripsi: "NOTE BOOK A4 MARUMAN N570A/B-52 SPIRAL L.\nNotebook A4 Maruman N570A/B-52 Sp L.\nSeptcoleur Notebook/ Memo\nCover Material: Pp\nBinding: Double Coil\n36 Lines, 80 Sheets, 7Mm-Ruled With Perforations, 70 G/?"
//     },
//     {
//         idToko: "63d0d4544de14b676e9173ef",
//         namaProduk: "Tote Bag",
//         img: "https://drive.google.com/uc?export=view&id=1Yw-zetTW6ZVKXGPvoNQ15gscgnbDrIcM",
//         price: 45000,
//         disc: 0,
//         kategori:"Fashion",
//         deskripsi: "Pamole Kanvas Tote Bag\nModel casual cocok buat kamu yang suka bepergian tapi gak mau pake tas ribet"
//     },
//     {
//         idToko: "63d0d4544de14b676e9173f0",
//         namaProduk: "Macbook",
//         img: "https://drive.google.com/uc?export=view&id=1r9f2HAAcEAdciBbC81OyZ2bBiQjG3bKH",
//         price: 9000000,
//         disc: 160000,
//         kategori:"Elektronik",
//         deskripsi: "BNIB (Brand New In Box)\n100% Original Apple\nBONUS:\n Hardcase\nSilicone Keyboard\nSoftware\nUntuk bonus dikirimkan selama stock persediaan masih ada (tidak terima komplain terkait bonus)\nGaransi Toko 7x24jam (wajib mencantumkan video unboxing sampai pengecekan unit)\nGaransi Unit 1 Tahun Apple International (bisa dibantu claim)"
//     },
//     {
//         idToko: "63d0d4544de14b676e9173f0",
//         namaProduk: "Iphone 14 Pro",
//         img: "https://drive.google.com/uc?export=view&id=1vMruHKsiKgp-5S2qdM-LJtdRgrbHgHv5",
//         price: 14000000,
//         disc: 200000,
//         kategori:"Elektronik",
//         deskripsi: "Didesain untuk selalu kokoh.\nDengan Ceramic Shield, lebih tangguh dari kaca ponsel pintar mana pun. Tahan air.1 Baja tahan karat sekelas alat bedah medis. Ukuran layar 6,1\ndan 6,7.2 Semuanya dalam empat warna Pro."
//     },
//     {
//         idToko: "63d0d4544de14b676e9173f1",
//         namaProduk: "Kalung",
//         img: "https://drive.google.com/uc?export=view&id=1-J6fqCkb6mLxGvvTGFMTUknX75xP1FbU",
//         price: 30000,
//         disc: 0,
//         kategori:"Aksesoris",
//         deskripsi: "Berbahan Cooper berwarna PUTIH / GOLD / Rose sebagai bahan dasarnya sesuai dengan warna product\nTidak berubah warna / luntur dan tidak berkarat\nAman dipakai untuk yang memiliki alergi dengan bahan ALLOY"
//     },
//     {
//         idToko: "63d0d4544de14b676e9173f1",
//         namaProduk: "Gelang",
//         img: "https://drive.google.com/uc?export=view&id=1hTW4-R-hLDOLPeVAMLU1uMEzlRfr-VvR",
//         price: 10000,
//         disc: 0,
//         kategori:"Aksesoris",
//         deskripsi: "Musha Braided bracelets are a delicate take on a classic style.\nEvery bracelet is 100% waterproof. Go surf, snowboard, or even take a shower with them on!\nWearing your bracelets every day only enhances the natural look and feel."
//     },
//     {
//         idToko: "63d0d4544de14b676e9173f2",
//         namaProduk: "Logitech Lightspeed Wireless",
//         img: "https://drive.google.com/uc?export=view&id=1eEUmxKAXdb9uX6NF1dXUrS9ySs84evcW",
//         price: 400000,
//         disc: 0,
//         kategori:"Elektronik",
//         deskripsi: "KUALITAS YANG BISA KAMU ANDALKAN\nMouse ini dibuat menggunakan standar kualitas tinggi sama yang menjadikan Logitech sebagai pemimpin global untuk mouse dan keyboard. Tahan lama dan andal, M220 juga dapat digunakan hingga maksimal 18 bulan tanpa mengganti baterai berkat tombol switch on/off dan mode auto-sleep penghemat daya"
//     },
//     {
//         idToko: "63d0d4544de14b676e9173f2",
//         namaProduk: "Rexus Mouse Wireless",
//         img: "https://drive.google.com/uc?export=view&id=1Pbx720C-ULjEYoZ4hlqV1b3UkLZEOYJ2",
//         price: 180000,
//         disc: 0,
//         kategori:"Elektronik",
//         deskripsi: "Dual Power High Performance Wireless Gaming Mouse\nTampil dengan desain stylish, balutan black doff cover yang elegan, ergonomis, serta modern, wireless gaming mouse Rexus Xierra R-108 mempunyai beragam fitur unggulan yang akan meningkatkan level permainan Anda"
//     },
//     {
//         idToko: "63d0d4544de14b676e9173f3",
//         namaProduk: "Pen Gel Hitam",
//         img: "https://drive.google.com/uc?export=view&id=1QA8KreIBj7l8EUNw9Vl9f1KH5-4QTUmn",
//         price: 10000,
//         disc: 3000,
//         kategori:"Aksesoris",
//         deskripsi: "Selamat datang di toko kami. Sebelum belanja silahkan baca deskripsi produk dengan baik dan teliti ya, perhatikan iklan agar tidak terjadi kesalahan saat pemesanan"
//     },
//     {
//         idToko: "63d0d4544de14b676e9173f3",
//         namaProduk: "Pen Gel Warna Warni",
//         img: "https://drive.google.com/uc?export=view&id=16h7pbt-RGE0y-l4c-ds2Pmeazdj5gCNc",
//         price: 10000,
//         disc: 0,
//         kategori:"Aksesoris",
//         deskripsi: "merk Youmei.\nKetebelan garis: 0.5mm\nHarga tertera adalah harga 12pcs pulpen gel warna warni.\nTerdiri dari 12 warna pulpen gel sesuai dengan foto tertera"
//     },
//     {
//         idToko: "63d0d4544de14b676e9173f4",
//         namaProduk: "Mantel",
//         img: "https://drive.google.com/uc?export=view&id=1s0C_pUF6Dxh-v5jAkHRFp6Hzw_ZY1mAW",
//         price: 30000,
//         disc: 0,
//         kategori:"Aksesoris",
//         deskripsi: "Merek: GRAVITY\nJenis : Setelan ( Atasan dan Celana ), dilengkapi dengan Resleting dan Kancing.\nBahan: PVC 0,25 Premium Tebal\nHigh Quality"
//     },
//     {
//         idToko: "63d0d4544de14b676e9173f4",
//         namaProduk: "Sendal Gunung",
//         img: "https://drive.google.com/uc?export=view&id=1EtoDEIHJRXksDZb-68yGaWgou7yWlHvm",
//         price: 150000,
//         disc: 0,
//         kategori:"Fashion",
//         deskripsi: "Sandal Gunung OD Adventure ini cocok dipakai untuk kegiatan outdoor, Outsole Rubber dengan daya cengkram yang baik, Eva insole ergonomis sehingga nyaman digunakan untuk segala aktifitas."
//     },
//     {
//         idToko: "63d0d4544de14b676e9173f5",
//         namaProduk: "Refurbished 14-inch Macbook Pro",
//         img: "https://drive.google.com/uc?export=view&id=1x-wyFA_QYS_v2gMAPYKxNpc_D84GPdxN",
//         price: 11000000,
//         disc: 99000,
//         kategori:"Elektronik",
//         deskripsi: "Case Macbook Pro 14 inch / 16 inch 2021 Spigen Urban Fit Merupakan Hardcase yang memiliki desain slim dan modern. Casing ini terbuat dari bahan PC (Hardcase) yang dibalut dengan lapisan fabric lembut pada bagian luar"
//     },
//     {
//         idToko: "63d0d4544de14b676e9173f5",
//         namaProduk: "Samsung Z flip 4",
//         img: "https://drive.google.com/uc?export=view&id=1alJG0R9TNMHK9HN6zDh-1tgZEIU7_ElW",
//         price: 8000000,
//         disc: 0,
//         kategori:"Elektronik",
//         deskripsi: "6.7 inci, 1080 x 2640 pixels, FHD+ Dynamic AMOLED 2X, Infinity Flex Display, 120Hz\nUkuran Layar Cover: 1.9 inci, Super AMOLED 60Hz\nMemori: RAM 8 GB, ROM 512 GB\nSistem operasi: Android 12, One UI 4.1"
//     },
//     {
//         idToko: "63d0d4544de14b676e9173f6",
//         namaProduk: "Sendal Gunung",
//         img: "https://drive.google.com/uc?export=view&id=1EtoDEIHJRXksDZb-68yGaWgou7yWlHvm",
//         price: 100000,
//         disc: 0,
//         kategori:"Fashion",
//         deskripsi: "ANTARESTAR merupakan produk Local Pride yang siap membuat anda menjadi bangga dengan buatan indonesia . Kami selalu memberikan pelayanan yang responsif dan memberikan kualitas terbaik dalam setiap produk yang dihasilkan karna dibuat oleh para pengrajin dan tenaga ahli yang sangat terampil dan berpengalaman"
//     },
//     {
//         idToko: "63d0d4544de14b676e9173f6",
//         namaProduk: "Sepatu",
//         img: "https://drive.google.com/uc?export=view&id=1PGuO1m4HEgJzuE3LigmXM3J59mPsps8T",
//         price: 220000,
//         disc: 0,
//         kategori:"Fashion",
//         deskripsi: "Sepatu yg dikirim dijamin BERKUALITAS TERBAIK dan TANPA CACAT , karena sebelum dikirim , SEPATU terlebih dahulu DIQC agar sepatu dikirim TIDAK MENGECEWAKAN pembeli"
//     },
//     {
//         idToko: "63d0d4544de14b676e9173f7",
//         namaProduk: "Tas Laptop",
//         img: "https://drive.google.com/uc?export=view&id=1JaVgGZYh5iFQfUl_RYU9h3oBdSS2W1Sn",
//         price: 100000,
//         disc: 0,
//         kategori:"Fashion",
//         deskripsi: "[09:31] Nabila Zahra LubisMemberikan perlindungan maksimal agar laptop Anda tetap terjaga dengan baik.\nDilengkapi dengan busa pengaman di bagian dalamnya, sehingga menjaga laptop Anda dari benturan keras.\nDengan pilihan warna yang colourful, aktivitas Anda jadi lebih berwarna dan tidak membosankan"
//     },
//     {
//         idToko: "63d0d4544de14b676e9173f7",
//         namaProduk: "Tas Sekolah",
//         img: "https://drive.google.com/uc?export=view&id=1u58jUa6BTu4hpvJ3De7omrvUt1g-Lg7m",
//         price: 99000,
//         disc: 0,
//         kategori:"Fashion",
//         deskripsi: "Produk 100% Original Naughty Accessories.\nModel Simple dan Praktis, dengan kualitas bagus dan harga terjangkau.Bisa digunakan untuk sehari hari ataupun ke sekolah,les atau berpergian.\nBahan kualitas bagus sehingga,perawatannya mudah dan anti air ,didalam tas ransel terdapat tempat untuk Laptop sehingga memudahkan kamu menyimpan laptop dengan aman"
//     }
// ])



router.get("/store", async (req, res) => {
    try {
        const data = await Toko.find();
        res.status(200).json(data)
    }
    catch (error) {
        res.status(404).json({ message: error.message })
    }

})

router.get("/produk", async (req, res) => {
    try {
        const data = await barang.find();
        res.status(200).json(data)
    }
    catch (error) {
        res.status(404).json({ message: error.message })
    }

})
router.get("/store/:id", async (req, res) => {
    try {
        id = req.params.id
        const data = await Toko.findById(id);
        res.status(200).json(data)
    }
    catch (error) {
        res.status(404).json({ message: error.message })
    }
})
router.get("/product/:id", async (req, res) => {
    try {
        id = req.params.id
        const data = await barang.find();
        const data2 = await data.filter((val) => val.idToko == id)
        res.status(200).json(data2)
    }
    catch (error) {
        res.status(404).json({ message: error.message })
    }

})
router.get("/detailProduct/:id", async (req, res) => {
    try {
        id = req.params.id
        const data = await barang.findById(id);
        res.status(200).json(data)
    }
    catch (error) {
        res.status(404).json({ message: error.message })
    }

})



router.post("/addCart", (req, res) => {
    Cart.insertMany([
        {
            qty: req.body.qty,
            cek: req.body.cek,
            namaProduk: req.body.namaProduk,
            img: req.body.img,
            price: req.body.price,
            disc: req.body.disc,
            namaToko: req.body.namaToko,
            kota: req.body.kota
        }
    ])
})

router.get("/getCart", async (req, res) => {
    try {
        const data = await Cart.find()
        res.status(200).json(data)
    }
    catch (error) {
        res.status(404).json({ message: error.message })
    }
})
router.delete("/deleteProduk/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Cart.findByIdAndDelete(id);
        res.status(204).send(data)

    }
    catch (error) {
        res.status(404).json({ message: error.message })
    }
})
router.put("/updateCek/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Cart.findByIdAndUpdate(
            id, updatedData, options
        )
        res.status(204).send(result)
    }
    catch (error) {
        res.status(404).json({ message: error.message })
    }
})

router.post("/register",[auth.checkDuplicateUsernameOrEmail], (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        gender:req.body.gender,
        noHp:req.body.noHp,
        password: req.body.password
    });

    user.save((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        else {
            res.send({ message: "User was registered successfully!" });
        }


    })
})

router.post("/login",(req, res) => {
    User.findOne({
        username: req.body.username
    })
        .exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }
            var token = jwt.sign({ id: user.id, username: user.username, email: user.email, gender: user.gender, noHp:user.noHp }, config.secret, {
                expiresIn: 86400 // 24 hours
            });

            res.status(200).send({
                id: user._id,
                username: user.username,
                email: user.email,
                gender: user.gender,
                noHp: user.noHp,
                accessToken: token
            });
        })
})


module.exports = router;
