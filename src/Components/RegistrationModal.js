import React, { useState } from "react"
import { Modal, Row, Col, Button, Form, Container } from "react-bootstrap"
import SuccessRegistrationModal from "./SuccessRegistrationModal"

export default function RegistrationModal(props) {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [password1, setPassword1] = useState("")
    const [message, setMessage] = useState("")
    const [showSuccessModal, setSuccessModal] = useState(false)
    const handleSuccesModal = () => setSuccessModal(!showSuccessModal)

    return (
        <>
        <Modal show={props.show}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <Container fluid>
                    <Row>
                        <Col>
                        </Col>
                        <Col className="text-center mt-3 mb-1">
                            <h3>Регистрация</h3>
                        </Col>
                        <Col className="text-right">
                            <Button variant="outline-dark" size="sm" onClick={props.handle}>
                                X
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="text-left">
                            <font color="red" size="4">{message}</font>
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
                                    <Form.Control onChange={(e) => setPassword1(e.target.value)} value={password1} type="password" placeholder="Пароли должны совпадать" />
                                </Form.Group>

                                <Button variant="dark" size="lg" onClick={signUp}>
                                    Зарегестрироваться
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>

            </Modal.Body>
            </Modal>
            <SuccessRegistrationModal show={showSuccessModal} handle={handleSuccesModal} loginHandle={props.loginHandle} />
        </>
    )
    async function signUp() {
        var requestBody = { username, email, password, password1 }
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
        if (!response.success) {
            setMessage(response.message)
        }
        if (response.success) {
            setUsername("")
            setEmail("")
            setPassword("")
            setPassword1("")
            setMessage("")
            openSuccessRegistrationModal()
        }
    }

    function openSuccessRegistrationModal() {
        props.handle()
        handleSuccesModal()
    }
}