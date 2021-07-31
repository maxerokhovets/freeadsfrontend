import React, { useState } from "react"
import { Modal, Row, Col, Button, Form, Container, Tooltip, OverlayTrigger } from "react-bootstrap"
import RegistrationModal from "./RegistrationModal"

export default function LoginModal(props) {

    const [usernameOrEmail, setUsernameOrEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showRegistrationModal, setShowRegistrationModal] = useState(false)
    const handleRegistrationModal = () => setShowRegistrationModal(!showRegistrationModal)
    const [message, setMessage] = useState("")

    return (
        <>
        <Modal show={props.show}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered >
            <Modal.Body>
                <Container fluid>
                    <Row>
                        <Col>
                        </Col>
                        <Col className="text-center mt-3">
                            <h3>Вход</h3>
                        </Col>
                        <Col className="text-right">
                            <Button variant="outline-dark" size="sm" onClick={props.handle}>
                                X
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="text-center mt-2">
                            <h6>Нет аккаунта?
                                        <OverlayTrigger placement="bottom-end" delay="200"
                                    overlay={
                                        <Tooltip>
                                            <h7>Регистрация на сайте</h7>
                                        </Tooltip>
                                    }>
                                        <Button variant="link" size="sm" onClick={openRegistrationModal}><h6>Зарегестрируйтесь здесь.</h6></Button>
                                </OverlayTrigger>
                            </h6>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="text-left">
                        <font color="red" size="4">{message}</font>
                            <Form>
                                <Form.Group className="mb-3 mt-2" controlId="formBasicEmail">
                                    <Form.Label>Имя пользователя или адрес электронной почты</Form.Label>
                                    <Form.Control onChange={(e) => setUsernameOrEmail(e.target.value)} value={usernameOrEmail} type="text" placeholder="Введите имя пользователя или email" />
                                </Form.Group>

                                <Form.Group className="mb-4" controlId="formBasicPassword">
                                    <Form.Label className="text-left">Пароль</Form.Label>
                                    <Form.Control onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Пароль" />
                                </Form.Group>
                                <Button onClick={signIn} variant="dark" size="lg">
                                    Вход
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="mt-2">
                            <OverlayTrigger placement="bottom-end" delay="200"
                                overlay={
                                    <Tooltip>
                                        <h7>Восстановление пароля</h7>
                                    </Tooltip>
                                }
                            >
                                <Button variant="link" size="sm"><h6>Забыли пароль?</h6></Button>
                            </OverlayTrigger>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            </Modal>
            <RegistrationModal show={showRegistrationModal} handle={handleRegistrationModal} loginHandle={props.handle} />
        </>
    )

    function openRegistrationModal() {
        props.handle()
        handleRegistrationModal()
    }

    async function signIn() {
        var requestBody = { usernameOrEmail, password }
        const url = "https://localhost:1000/auth/signin"
        const result = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                "Content-Type": 'application/JSON',
                "Accept": 'application/JSON'
            }
        })
        const response = await result.json()
        if (response.message != "Success") {
            setMessage("Неверные данные пользователя или пароль.")
        } else {
            localStorage.setItem("ACCESS_TOKEN", response.accessToken)
            setUsernameOrEmail("")
            setPassword("")
            setMessage("")
            props.handle()
            window.location.reload()
        }
    }

}