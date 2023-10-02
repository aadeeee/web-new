import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import "../style/TokoDetail.css"
import swal from 'sweetalert';
import Card from 'react-bootstrap/Card';
import Loading from "./Loading";
export default function TokoDetail() {
  const [dataToko, setDataToko] = useState([])
  const [dataProduk, setDataProduk] = useState([])
  const { idToko } = useParams()
  useEffect(() => {
    fetch(`http://localhost:8000/store/${idToko}`)
      .then((data) => data.json())
      .then((data) => setDataToko(data))
  }, [])

  useEffect(() => {
    fetch(`http://localhost:8000/Product/${idToko}`)
      .then((data) => data.json())
      .then((data) => setDataProduk(data))
  }, [])
  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR'
  });
  
  return (
    <>
      {dataProduk.length === 0 ? <Loading /> :
        <div className="container-root">
          {dataProduk.map((val) => (
            <div >
              <div>
                <div className="container2">
                  <div className="produkPosition">
                    <Card style={{ width: '20rem' }} className="Produk">
                      <Card.Img variant="top" src={val.img} className="gambarProduk" />
                      <Card.Body>
                        <Card.Title>
                          <p>{val.namaProduk}</p>
                          <p className="hargaProduk">
                            {formatter.format(val.price?val.price - val.disc: " ")}</p>
                          <p className="diskon"><i><s>{ val.disc ? formatter.format(val.price) :" "}</s></i></p>
                          
                          <button type="button" className="btn btn-light" onClick={() => {
                            fetch("http://localhost:8000/addCart", {
                              method: "POST",
                              headers: {
                                "content-type": "application/json"
                              },
                              body: JSON.stringify({
                                qty: 1,
                                cek: false,
                                namaProduk: val.namaProduk,
                                img: val.img,
                                price: val.price,
                                disc: val.disc,
                                namaToko: dataToko.namaToko,
                                kota: dataToko.kota
                              })
                            })
                            swal("Success!", "Barang ditambahkan ke dalam keranjang!", "success");
                          }}>Add Cart</button>
                          
                        </Card.Title>
                        <a className="produkDetail" href={`/toko/${idToko}/${val._id}`}>Produk detail</a>
                        <Card.Text>
                          {val.kota}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </div>
                  <div>
                  </div>
                </div>
              </div>
            </div>

          ))}

        </div>}
    </>
  )
}