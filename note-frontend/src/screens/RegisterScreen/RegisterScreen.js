import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, Row, Col } from "react-bootstrap";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import MainScreen from "../../components/MainScreen";
import "./RegisterScreen.css";
import { toast } from "react-toastify";
import "./../../toastifyCustomStyles.css";

const RegisterScreen = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");

  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const registerHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmpassword) {
      setMessage("Password and Confirm Password do not match");
    } else {
      setMessage(null);
      try {
        const config = {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        };

        setLoading(true);
        const response = await fetch("http://localhost:5000/api/users", config);

        if (response.ok) {
          const data = await response.json();
          setLoading(false);

          toast.success("Register Successfully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 300,
          });

          toast.success("Please Login", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });

          navigate("/login");
        } else {
          throw new Error("Failed to register");
        }
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }
  };

  return (
    <MainScreen title="Create your account">
      <div className="registerContainer">
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Loading></Loading>}

        <Form onSubmit={registerHandler} className="formStyles">
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="Ram"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              required
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="abc@example.com"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="*****"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              required
              type="password"
              value={confirmpassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              placeholder="*****"
            />
          </Form.Group>

          <button type="submit" className="registerButton">
            Register
          </button>
        </Form>

        <Row className="py-3">
          <Col className="registerCol">
            Already have an account?
            <span className="loginLink">
              <Link to="/login"> Login Here</Link>
            </span>
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default RegisterScreen;
