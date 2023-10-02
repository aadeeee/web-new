import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import swal from "sweetalert"
import "../style/DetailProduk.css";
export default function Productdetail() {
    const [dataToko, setDataToko] = useState([])
    const [dataProduk, setDataProduk] = useState([])
    const { idToko, idProduct } = useParams()
    useEffect(() => {
        fetch(`http://localhost:8000/store/${idToko}`)
            .then((data) => data.json())
            .then((data) => setDataToko(data))
    }, [])
    useEffect(() => {
        fetch(`http://localhost:8000/detailProduct/${idProduct}`)
            .then((data) => data.json())
            .then((data) => setDataProduk(data))
    }, [])
    const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
      });
    return (
        <>
        <div>
            <div className="containerD">
                <div className="gbr">
                    <img src={dataProduk.img} alt="" />  
                    <div className="dataproduk">
                        <div className="namaproduk">{dataProduk.namaProduk}</div>
                        <div className="harga">
                            <div className="nominal">{formatter.format(dataProduk.price)}</div>
                        </div>  
                        
                        <div className="deskripsi">{dataProduk.deskripsi}</div>
                        <div>
                            <button type="button" className="addtocart" onClick={() => {
                fetch("http://localhost:8000/addCart", {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({
                        qty: 1,
                        cek: false,
                        namaProduk: dataProduk.namaProduk,
                        img: dataProduk.img,
                        price: dataProduk.price,
                        disc: dataProduk.disc,
                        namaToko: dataToko.namaToko,
                        kota: dataToko.kota
                    })
                })
                swal("Success!", "Barang ditambahkan ke dalam keranjang!", "success");
            }}>ADD TO CART</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        </>
    )
}