import React from "react";
import '../style/navbar.css';
import { useNavigate } from "react-router-dom";
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { RxAvatar } from 'react-icons/rx';

function Navbar() {
    const navigate = useNavigate()
    return (
        <header className="section-header">
            <nav className="navbar navbar-expand navbar-light" id="nav">
                <div className="container-fluid" >
                    <ul className="navbar-nav">
                        <li className="nav-item"><a className="nav-link" href="#" data-abc="true"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-phone" viewBox="0 0 16 16">
                            <path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h6zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H5z" />
                            <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                        </svg>Download Tokopedia App</a></li>
                        <li className="nav-item"><a className="nav-link" href="#" data-abc="true"><li className="cart3" onClick={() => {
                            navigate("/")
                        }}>HOME</li></a></li>
                    </ul>
                    <ul className="navbar-nav">


                        <li className="nav-item"><a className="nav-link" href="#" data-abc="true" onClick={() => {
                            navigate("/kategori")
                        }}>Kategori</a></li>
                        <li className="nav-item"><a className="nav-link" href="#" data-abc="true" onClick={() => {
                            navigate("/logout")
                        }}>Logout</a></li>
                        <li className="nav-item"><a className="nav-link" href="#" data-abc="true"><li className="cart3" onClick={() => {
                            navigate("/cart")
                        }}><AiOutlineShoppingCart /></li></a></li>
                        <li className="nav-item"><a className="nav-link" href="#" data-abc="true"><li className="cart3" onClick={() => {
                            navigate("/user")
                        }}><RxAvatar /></li></a></li>

                    </ul>
                </div>

            </nav>
        </header>
    )
}
export default Navbar;