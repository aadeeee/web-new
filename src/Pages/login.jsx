import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Login.css"
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol,
    MDBInput
}
    from 'mdb-react-ui-kit';


export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate()
    const handleSubmit = async e => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:8000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });

            if (!res.ok) {
                throw new Error(await res.text());
            }
            const data = await res.json();
            navigate("/")
            localStorage.setItem("token", data.accessToken);

        } catch (error) {
            setError(error.message);
        }
    };


    return (

        <form onSubmit={handleSubmit} className="form">
            <MDBContainer className=" loginCard">

                <MDBCard>
                    <MDBRow className='g-0'>

                        <MDBCol md='6'>
                            <MDBCardImage className="iconLogin" src='https://media.istockphoto.com/id/1195743934/id/vektor/desain-vektor-karakter-panda-lucu.jpg?s=612x612&w=0&k=20&c=KKTXLb68VkX8JW8KRVogaVD7J7kK_SZLt5TG8a3Ilmw=' />
                        </MDBCol>

                        <MDBCol md='6'>
                            <MDBCardBody className='d-flex flex-column'>

                                <h5 className="fw-normal  pb-3 text" style={{ letterSpacing: '1px' }}>Sign into your account</h5>

                                <MDBInput wrapperClass='mb-4' label='Username' value={username} id='formControlLg' type='text' size="lg" onChange={e => setUsername(e.target.value)} />
                                <MDBInput wrapperClass='mb-4' label='Password' value={password} id='formControlLg' type='password' size="lg" onChange={e => setPassword(e.target.value)} />
                                {error && <div className="error">Invalid Username Or Password</div>}
                                <MDBBtn className="mb-4 px-5" color='dark' size='lg'>Login</MDBBtn>
                                <a className="small text-muted" href="#!">Forgot password?</a>
                                <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}> <a href="#!" style={{ color: '#393f81' }} onClick={() => {
                                    navigate("/register")
                                }}>Register here</a></p>

                            </MDBCardBody>
                        </MDBCol>

                    </MDBRow>
                </MDBCard>

            </MDBContainer>
        </form>
    );
};