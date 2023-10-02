import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Registration.css"
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBInput,
    MDBIcon
}
    from 'mdb-react-ui-kit';

export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [noHp, setNoHp] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate()

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            fetch("http://localhost:8000/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, gender, noHp, password })
            });

            // redirect to the login page
            window.location = "/login";
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <MDBContainer fluid className="fullRegis">

                <MDBCard className='text-black ' style={{ borderRadius: '25px' }}>
                    <MDBCardBody>
                        <MDBRow>
                            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

                                <h1 className="signUp">Sign up</h1>

                                <div class="flex-container10">
                                    <div className="d-flex flex-row align-items-center mb-4 ">
                                        <MDBIcon fas icon="user me-3" size='lg' />
                                        <MDBInput
                                            label='Username'
                                            type="text"
                                            id="username"
                                            value={username}
                                            maxLength={30}
                                            minLength={4}
                                            required
                                            placeholder="Username"
                                            onChange={e => setUsername(e.target.value)} className='w-100' />
                                    </div>
                                    <div className="d-flex flex-row align-items-center mb-4">
                                        <MDBIcon fas icon="envelope me-3" size='lg' />
                                        <MDBInput
                                            label='Email'
                                            type='email'
                                            value={email}
                                            required
                                            placeholder="Email"
                                            onChange={e => setEmail(e.target.value)} />
                                    </div>

                                </div>
                                <div class="flex-container10">
                                    <div className="d-flex flex-row align-items-center mb-4">
                                        <MDBIcon fas icon="envelope me-3" size='lg' />
                                        <MDBInput
                                            label='Gender'
                                            type='text'
                                            value={gender}
                                            required
                                            placeholder="Gender"
                                            onChange={e => setGender(e.target.value)} />
                                    </div>
                                    <div className="d-flex flex-row align-items-center mb-4">
                                        <MDBIcon fas icon="envelope me-3" size='lg' />
                                        <MDBInput
                                            label='HandPhone'
                                            type='Number'
                                            value={noHp}
                                            minLength={11}
                                            maxLength={12}
                                            required
                                            placeholder="No.Handphone"
                                            onChange={e => setNoHp(e.target.value)} />
                                    </div>

                                </div>

                                <div className="d-flex flex-row align-items-center mb-4">
                                    <MDBIcon fas icon="lock " size='lg' />
                                    <MDBInput
                                    className="password"
                                        label='Password'
                                        type='password'
                                        maxLength={16}
                                        minLength={8}
                                        value={password}
                                        required
                                        placeholder="Password"
                                        onChange={e => setPassword(e.target.value)} />
                                </div>

                                <MDBBtn className="mb-4 px-5" color='dark' size='lg'>Register</MDBBtn>
                                <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}> <a href="#!" style={{ color: '#393f81' }} onClick={() => {
                                    navigate("/login")
                                }}>Already have Account? Login Here</a></p>

                            </MDBCol>

                            <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
                                <MDBCardImage className="iconRegis" src='https://media.istockphoto.com/id/1195743934/id/vektor/desain-vektor-karakter-panda-lucu.jpg?s=612x612&w=0&k=20&c=KKTXLb68VkX8JW8KRVogaVD7J7kK_SZLt5TG8a3Ilmw=' fluid />
                            </MDBCol>

                        </MDBRow>
                    </MDBCardBody>
                </MDBCard>

            </MDBContainer>
            {error && <div classNameName="error">{error}</div>}
        </form>
    );
};