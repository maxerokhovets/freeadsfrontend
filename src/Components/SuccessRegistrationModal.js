import React from "react";
import { Button, Container, Row, Col, Modal } from 'react-bootstrap';

export default function SuccessRegistrationModal(props) {
    

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
                        <Col></Col>
                        <Col></Col>
                        <Col className="text-right">
                        <Button variant="outline-dark" size="sm" onClick={props.handle}>
                                X
                            </Button>
                        </Col>
                    </Row>
                    <Row className="text-center">
                        <Col><font class="font-weight-bold" size="5">Ваш аккаунт успешно зарегестрирован.</font></Col>
                    </Row>
                    <Row className="text-center mt-3">
                        <Col>
                            <Button size="lg" variant="dark" onClick={openLoginModal}>Войти</Button>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
        </Modal>
        </>
    )

    function openLoginModal() {
        props.handle()
        props.loginHandle()
    }
}