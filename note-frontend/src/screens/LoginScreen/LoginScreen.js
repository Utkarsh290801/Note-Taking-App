import axios from 'axios';
import React, { useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { Link,useNavigate } from 'react-router-dom';
import ErrorMessage from '../../components/ErrorMessage';
import Loading from '../../components/Loading';
import MainScreen from '../../components/MainScreen';
import './LoginScreen.css';

import { toast } from 'react-toastify';
import './../../toastifyCustomStyles.css';

const LoginScreen = () => {

const navigate = useNavigate();

const [email,setEmail] = useState("");
const [password, setPassword] = useState("");
const [loading, setLoading] = useState(false);
const [error, setError] = useState(false);

const submitHandler = async (e) => {
    e.preventDefault();
    try {
        setLoading(true);
        const body = JSON.stringify({ email, password });
        const response = await fetch('http://localhost:5000/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body,
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('userLogin', JSON.stringify(data));
            setLoading(false);
            setError(null);

            toast.success('Login Successfully', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1000,
            });

            navigate('/mynotes');
        } else {
            const data = await response.json();
            setError(data.message);
            setLoading(false);
        }
    } catch (error) {
        setError(error.message);
        setLoading(false);
    }
}

    return(
        <MainScreen title='Enter your details'>
            <div className='loginContainer'>
                {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
                { loading && <Loading/> }
                <Form className='formStyles' onSubmit={submitHandler}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            required 
                            type="email"
                            placeholder="abc@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            required 
                            type="password" 
                            placeholder="*******"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>

                    <button className='loginButton' type="submit">
                        Login
                    </button>

                </Form>


                <Row className='py-3'>
                    <Col className='loginCol'>
                    Don't have an account?  
                    <span className='registerLink'>
                        <Link to='/register'> Regsiter Here</Link>
                    </span>
                    </Col>
                </Row>
            </div>
        </MainScreen>
    )
}

export default LoginScreen;