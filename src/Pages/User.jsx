import jwt_decode from "jwt-decode";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { BsSearch } from 'react-icons/bs'
import { IoMdNotifications } from 'react-icons/io'
import { RxAvatar } from 'react-icons/rx';
import { MdEmail } from 'react-icons/md';
import { BsShieldPlus } from 'react-icons/bs';
import { BsCreditCard2Back } from 'react-icons/bs';
import { FaRegMoneyBillAlt } from 'react-icons/fa';
import { GrEmptyCircle } from 'react-icons/gr';
import { FaRegUser } from 'react-icons/fa';
import { MdStars } from 'react-icons/md';
import "../style/user.css"

export default function User() {
    const data = localStorage.getItem("token")
    const dataDecode = jwt_decode(data)
    console.log(dataDecode)
    return (
        <>

            <div>
                <div className="containerC">
                    <div className="kiri">
                        <div id="nama">
                            <div className="ikon"><RxAvatar /></div>
                            <div>
                                <li>Nama</li>
                                <li id="plus">
                                    <div><BsShieldPlus /></div>
                                    <span>Tambah Nomor HP</span>
                                </li>
                            </div>
                        </div>
                        <div className="pay">
                            <div><BsCreditCard2Back />     Gopay</div>
                            <div id="ijo">Aktifkan</div>
                        </div>
                        <div className="pay">
                            <div><FaRegMoneyBillAlt /> Saldo</div>
                            <div>Rp0</div>
                        </div>
                        <div className="pay">
                            <div><GrEmptyCircle /> OVO Cash</div>
                            <div id="ijo">Aktifkan</div>
                        </div>

                        <div className="member">
                            <div className="ikon"><MdStars /></div>
                            <div>
                                <li id="hitam">Member Silver 1</li>
                                <li>
                                    <table>
                                        <tr>
                                            <td>Toko Member</td>
                                            <td id="angka"> 0</td>
                                        </tr>
                                        <tr>
                                            <td>Misi Seru</td>
                                            <td id="angka">15</td>
                                        </tr>
                                        <tr>
                                            <td>Kupon Saya</td>
                                            <td id="angka">0</td>
                                        </tr>
                                    </table>
                                </li>

                            </div>
                        </div>
                    </div>
                    <div>
                        <div id="atas">
                            <div><FaRegUser /></div>
                            <div className="nama">Nama</div>
                        </div>
                        <div className="kanan">
                            <div className="menu">
                                <div className="menu1">Biodata Diri</div>
                            </div>
                            <div className="data">
                                <div className="foto">
                                    <li>
                                        <img src="https://ae01.alicdn.com/kf/HTB1Akq8LXXXXXX0XVXXq6xXFXXXd/15-2-14-7CM-Marah-Sedih-Kecil-Lucu-Panda-Stiker-Mobil-Vinil-Tubuh-Mobil-Decal-Aksesori.jpg_Q90.jpg_.webp" alt="" />
                                    </li>
                                    <li id="pilih"><a href="#">Pilih Foto</a></li>

                                </div>

                                <div className="bio">
                                    <p>Ubah Biodata Diri</p>
                                    <table>
                                        <tr>
                                            <td>Nama</td>
                                            <td>{dataDecode.username} <a href="#">Ubah</a></td>
                                        </tr>
                                        <tr>
                                            <td>Jenis Kelamin</td>
                                            <td><a href="#">Pilih Jenis Kelamin</a></td>
                                        </tr>
                                        <p>Ubah Kontak</p>
                                        <tr>
                                            <td>Email</td>
                                            <td>{dataDecode.email}  <small>Terverifikasi</small> <a href="#">Ganti Email</a></td>
                                        </tr>
                                        <tr>
                                            <td>Nomor HP</td>
                                            <td><a href="#">Tambah no HP</a></td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}