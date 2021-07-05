import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";

export default class LoginForm extends Component {
    render() {
        return (
            <>
                <Form>
                    <Form.Group className="mb-3 mt-3" controlId="formBasicUsername">
                        <Form.Label>Имя пользователя</Form.Label>
                        <Form.Control type="email" placeholder="Придумайте имя пользователя" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Адрес электронной почты</Form.Label>
                        <Form.Control type="email" placeholder="Введите email" />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="formBasicPassword">
                        <Form.Label className="text-left">Пароль</Form.Label>
                        <Form.Control type="password" placeholder="Пароль" />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="formBasicPassword1">
                        <Form.Label className="text-left">Повторите пароль</Form.Label>
                        <Form.Control type="password" placeholder="Пароли должны совпадать" />
                    </Form.Group>

                    <Button variant="dark" size="lg" type="submit">
                        Зарегестрироваться
                    </Button>
                </Form>
            </>
        );
    }
}