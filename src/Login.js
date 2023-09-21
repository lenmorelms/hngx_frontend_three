import React, { useState, useRef } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Form, Card, Button, Alert } from "react-bootstrap";
import { auth } from "./firebase";
    const Login = () => {
        const [ error, setError ] = useState("");
        const emailRef = useRef();
        const passwordRef = useRef();

        const navigate = useNavigate();
        async function handleSubmit(e) {
            e.preventDefault();
            signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
            .then((userCredential) => {
                // setLoading(true);
                console.log(userCredential);
                navigate("/");
            })
            .catch((error) => { 
                setError("Invalid username/password");
                console.log(error);
            });
        }
    return (
        <div className="d-flex align-items-center center">
        <Card style={{ minWidth: "400px" }}>
            <Card.Body>
                <h2 className="text-center mb-4">Sign In</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control className="email" type="email" ref={emailRef} required />
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control className="password" type="password" ref={passwordRef} required />
                    </Form.Group>
                    <Button onClick={handleSubmit} className="w-100 submit" type="submit">Sign In</Button>
                </Form>
            </Card.Body>
        </Card>
        </div>
    );
}

export default Login;