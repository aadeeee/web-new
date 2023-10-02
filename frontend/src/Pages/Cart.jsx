import { useEffect, useState } from "react";
import Loading from "./Loading";
import "../style/Cart.css"
import swal from 'sweetalert';
import { BiTrash } from 'react-icons/bi'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { AiOutlineMinusCircle } from 'react-icons/ai'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { AiTwotoneMinusCircle } from 'react-icons/ai'
import ChartKosong from "./chartKosong";
export default function Cart() {
    const [data, setData] = useState([])
    const [load, setLoad] = useState(true)
    const [harga, setHarga] = useState(0)
    const [disc, setDisc] = useState(0)
    const [total, setTotal] = useState(0)
    const [check, setCheck] = useState(false)
    const [storeCek, setStoreCek] = useState([])

    const [datacek, setDatacek] = useState([])
    // function untuk update harga
    function changeHarga(data) {
        let harga = 0
        let disc = 0
        let total = 0
        let banyakdatatrue = 0
        let banyakdata = 0
        let arraycek = []
        let datacek = []
        for (let i = 0; i < data.length; i++) {
            let hasil = 0
            for (let j = 0; j < data[i].produk.length; j++) {
                banyakdata += 1
                if (data[i].produk[j].cek) {
                    datacek.push(data[i].produk[j].id)
                    hasil += 1
                    harga += data[i].produk[j].price * data[i].produk[j].qty
                    disc += data[i].produk[j].disc * data[i].produk[j].qty
                    total += data[i].produk[j].qty
                    banyakdatatrue += 1
                }
            }
            if (data[i].produk.length === hasil) {
                arraycek.push(true)
            }
            else {
                arraycek.push(false)
            }
        }
        if (banyakdata === banyakdatatrue) {
            setCheck(true)
        }
        else {
            setCheck(false)
        }
        setStoreCek(arraycek)
        setHarga(harga)
        setDisc(disc)
        setTotal(total)
        setDatacek(datacek)
    }
    //mapping data karena data dari database apabila 1 toko namun 2 data akan muncul 2 kali jadi fungsi ini bertujuan untuk menghandle hal tersebut .
    function mapData(data) {
        const filter = {}
        for (let i = 0; i < data.length; i++) {
            const namatoko = data[i].namaToko
            if (!filter[namatoko]) {
                filter[`${data[i].namaToko}`] = {
                    namaToko: data[i].namaToko,
                    kota: data[i].kota,
                    produk: [{
                        id: data[i]._id,
                        namaProduk: data[i].namaProduk,
                        img: data[i].img,
                        price: data[i].price,
                        disc: data[i].disc,
                        qty: data[i].qty,
                        cek: data[i].cek
                    }]
                }
            }
            else {

                filter[`${namatoko}`].produk.push({
                    id: data[i]._id,
                    namaProduk: data[i].namaProduk,
                    img: data[i].img,
                    price: data[i].price,
                    disc: data[i].disc,
                    qty: data[i].qty,
                    cek: data[i].cek
                })
            }
        }
        const keyFilter = Object.keys(filter)
        const newdata = []
        for (let i in keyFilter) {
            newdata.push(filter[`${keyFilter[i]}`])
        }
        setData(newdata)
        changeHarga(newdata)
    }

    useEffect(() => {
        fetch("http://localhost:8000/getCart")
            .then((data) => data.json())
            .then((data) => {
                mapData(data)
                setLoad(false)
            })
    }, [])
    const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
      });

    return (
        <div>
            <div class="flex-container3">
                <div className="full">
                    {load ? <Loading /> : data.length === 0 ? <div><ChartKosong /> </div> : <>
                        <div className="pad">
                            <div className="top">
                                <p className="keranjang">Keranjang</p>
                            </div>
                            <div className='d-flex flex-row top'>
                                <div className='p-1'>
                                    <input type="checkbox" name='cekToko' id="option-all" checked={check ? true : false} onChange={(e) => {
                                        const databackup = [...data]
                                        if (e.target.checked) {
                                            for (let i = 0; i < databackup.length; i++) {
                                                for (let j = 0; j < databackup[i].produk.length; j++) {
                                                    databackup[i].produk[j].cek = true
                                                    fetch(`http://localhost:8000/updateCek/${databackup[i].produk[j].id}`, {
                                                        method: "PUT",
                                                        headers: {
                                                            "Content-type": "application/json"
                                                        }
                                                        , body: JSON.stringify({
                                                            cek: databackup[i].produk[j].cek
                                                        })
                                                    })
                                                }
                                            }
                                        }
                                        else {
                                            for (let i = 0; i < databackup.length; i++) {
                                                for (let j = 0; j < databackup[i].produk.length; j++) {
                                                    databackup[i].produk[j].cek = false
                                                    fetch(`http://localhost:8000/updateCek/${databackup[i].produk[j].id}`, {
                                                        method: "PUT",
                                                        headers: {
                                                            "Content-type": "application/json"
                                                        }
                                                        , body: JSON.stringify({
                                                            cek: databackup[i].produk[j].cek
                                                        })
                                                    })
                                                }
                                            }
                                        }
                                        setData(databackup)
                                        changeHarga(databackup)
                                    }}></input>

                                </div>
                                <div className='p-2'>
                                    <p className='blur'>Pilih Semua</p>
                                </div>
                                {datacek.length != 0 && <button onClick={() => {
                                    const databackup = [...data]
                                    for (let i = 0; i < datacek.length; i++) {
                                        fetch(`http://localhost:8000/deleteProduk/${datacek[i]}`, {
                                            method: "DELETE"
                                        })
                                            .then(() => {
                                                for (let j = 0; j < databackup.length; j++) {
                                                    const filter = databackup[j].produk.filter((del) => del.id !== datacek[i])
                                                    databackup[j].produk = filter
                                                    if (databackup[j].produk.length === 0) {
                                                        databackup.splice(j, 1)
                                                    }
                                                }
                                                setData(databackup)
                                                changeHarga(databackup)
                                            })
                                    }
                                }} className="delete5">Hapus semua</button>}
                            </div>
                        </div>
                        {data.map((val, idx) => {
                            return (
                                <div>
                                    <div className="cart">
                                        <div className='d-flex flex-row'>
                                            <div className='p-2'>
                                                <input type="checkbox" name='cekToko' id="option-a" checked={storeCek[idx] ? true : false}
                                                    onClick={(e) => {
                                                        const databackup = [...data]
                                                        if (e.target.checked) {
                                                            for (let i = 0; i < databackup[idx].produk.length; i++) {
                                                                databackup[idx].produk[i].cek = true
                                                                fetch(`http://localhost:8000/updateCek/${databackup[idx].produk[i].id}`, {
                                                                    method: "PUT",
                                                                    headers: {
                                                                        "Content-type": "application/json"
                                                                    }
                                                                    , body: JSON.stringify({
                                                                        cek: databackup[idx].produk[i].cek
                                                                    })
                                                                })

                                                            }
                                                        }
                                                        else {
                                                            for (let i = 0; i < databackup[idx].produk.length; i++) {
                                                                databackup[idx].produk[i].cek = false
                                                                fetch(`http://localhost:8000/updateCek/${databackup[idx].produk[i].id}`, {
                                                                    method: "PUT",
                                                                    headers: {
                                                                        "Content-type": "application/json"
                                                                    }
                                                                    , body: JSON.stringify({
                                                                        cek: databackup[idx].produk[i].cek
                                                                    })
                                                                })
                                                            }
                                                        }
                                                        setData(databackup)
                                                        changeHarga(databackup)
                                                    }}
                                                ></input>
                                            </div>
                                            <div className='p-2' key={val._id}>
                                                <p className='blur'>{val.namaToko}</p>
                                                <p>{val.kota}</p>
                                            </div>
                                        </div>
                                        {val.produk.map((item, index) => {
                                            return (< div id="produk">
                                                <div className='d-flex flex-row mb-2' >
                                                    <div className='p-2'>
                                                        <input type="checkbox" name='cekBarang' id="option-b" checked={item.cek} onClick={() => {
                                                            fetch(`http://localhost:8000/updateCek/${item.id}`, {
                                                                method: "PUT",
                                                                headers: {
                                                                    "Content-type": "application/json"
                                                                },
                                                                body: JSON.stringify({ cek: !item.cek })
                                                            })
                                                                .then(() => {
                                                                    const dataBackup = [...data]
                                                                    dataBackup[idx].produk[index].cek = !dataBackup[idx].produk[index].cek
                                                                    setData(dataBackup)
                                                                    changeHarga(dataBackup)
                                                                })

                                                        }} />
                                                    </div>
                                                    <div className='p-2' key={item._id}>
                                                        <div className="grid-container">
                                                            <div className="grid-item"><img className="gambar1" src={item.img} alt="" /></div>
                                                            <div className="grid-item">
                                                                <li>{item.namaProduk}</li>
                                                                <li><b>{formatter.format(item.price?item.price - item.disc: " ")}</b></li>
                                                                <li><i><s>{ item.disc ? formatter.format(item.price) :" "}</s></i></li>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="flex-container1">
                                                        <li>
                                                            <div className="input">
                                                                <input type="textarea" class="form-control" id="catatan" placeholder="Detail pemesanan" />
                                                            </div>
                                                            <div className="jumlah">{item.qty === 1 ? < AiTwotoneMinusCircle className="jarak" /> : <AiOutlineMinusCircle onClick={() => {
                                                                fetch(`http://localhost:8000/updateCek/${item.id}`, {
                                                                    method: "PUT",
                                                                    headers: {
                                                                        "Content-type": "application/json"
                                                                    },
                                                                    body: JSON.stringify({ qty: item.qty - 1 })
                                                                })
                                                                    .then(() => {
                                                                        const dataBackup = [...data]
                                                                        dataBackup[idx].produk[index].qty = item.qty - 1
                                                                        setData(dataBackup)
                                                                        changeHarga(dataBackup)
                                                                    })
                                                            }} />} <p>
                                                                    {item.qty}
                                                                </p> {item.qty === 7 ? < AiTwotoneMinusCircle className="jarak" /> : <AiOutlinePlusCircle onClick={() => {
                                                                    fetch(`http://localhost:8000/updateCek/${item.id}`, {
                                                                        method: "PUT",
                                                                        headers: {
                                                                            "Content-type": "application/json"
                                                                        },
                                                                        body: JSON.stringify({ qty: item.qty + 1 })
                                                                    })
                                                                        .then(() => {
                                                                            const dataBackup = [...data]
                                                                            dataBackup[idx].produk[index].qty = item.qty + 1
                                                                            setData(dataBackup)
                                                                            changeHarga(dataBackup)
                                                                        })
                                                                }} />}
                                                            </div>
                                                        </li>

                                                    </div>
                                                    <p className="sampah" onClick={() => {
                                                        fetch(`http://localhost:8000/deleteProduk/${item.id}`, {
                                                            method: "DELETE"

                                                        })
                                                            .then(() => {
                                                                const databackup = [...data]
                                                                const filter = val.produk.filter((del) => del.id !== item.id)
                                                                databackup[idx].produk = filter
                                                                if (databackup[idx].produk.length === 0) {
                                                                    databackup.splice(idx, 1)
                                                                }
                                                                setData(databackup)
                                                                changeHarga(databackup)
                                                            })
                                                    }} ><BiTrash /></p>



                                                </div>
                                            </div>)
                                        })}

                                    </div>
                                </div>
                            )
                        })}

                    </>}
                </div>
                <div>
                    {data.length != 0 && <div className="bayar">

                        <Card style={{ width: 'auto' }}>
                            <Card.Body>
                                <Card.Title>Ringkasan Belanja</Card.Title>
                                <div><hr /></div>
                                <div>
                                    <Card.Subtitle className="mb-2 text-muted">
                                        <li>
                                            <p>Total Harga({total} barang) {'     '}: {formatter.format(harga)}</p>
                                        </li>
                                        <li>
                                            <p>Diskon {'     '}: Rp. {disc}</p>
                                        </li>
                                        <div><hr /></div>
                                    </Card.Subtitle>
                                </div>
                                <Card.Title>Total Tagihan :{formatter.format(harga - disc)}</Card.Title>
                                <div className="d-grid gap-2">
                                    <Button variant="success" onClick={() => {
                                        swal({
                                            title: "Terimakasih Sudah Berbelanja",
                                            text: "Barang Segera Di Proses"
                                        });
                                    }
                                    } className="belanja">Beli ({total})  </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>}
                </div>
            </div>
        </div>
    )
}