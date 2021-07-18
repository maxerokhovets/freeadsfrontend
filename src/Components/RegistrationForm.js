import React, { Component, useState } from "react";
import { Button, Form } from "react-bootstrap";

export default function LoginForm() {

        const [username, setUsername] = useState("");
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");

    return (
            <>
                <Form>
                    <Form.Group className="mb-3 mt-3" controlId="formBasicUsername">
                        <Form.Label>Имя пользователя</Form.Label>
                        <Form.Control onChange={(e) => setUsername(e.target.value)} value={username} type="text" placeholder="Придумайте имя пользователя" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Адрес электронной почты</Form.Label>
                        <Form.Control onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Введите email" />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="formBasicPassword">
                        <Form.Label className="text-left">Пароль</Form.Label>
                        <Form.Control onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Пароль" />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="formBasicPassword1">
                        <Form.Label className="text-left">Повторите пароль</Form.Label>
                        <Form.Control type="password" placeholder="Пароли должны совпадать" />
                    </Form.Group>

                    <Button variant="dark" size="lg" onClick={signUp}>
                        Зарегестрироваться
                    </Button>
                </Form>
            </>
    );
    async function signUp(){
        var requestBody = {username, email, password}
        const url = "https://localhost:1000/auth/signup"
        const result = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                "Content-Type": 'application/JSON',
                "Accept": 'application/JSON'
                }
        })
        const response = await result.json()
        console.log(response)
        
    }
    
}