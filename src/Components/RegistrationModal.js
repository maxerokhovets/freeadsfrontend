import React, { Component } from "react";
import { Container, Modal, Row, Col, Button } from "react-bootstrap";

export default class RegistrationModal extends Component {

    render() {
        return (
         <>
            <Modal show={this.props.show}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered                
            >
            <Modal.Body>
                <Container fluid>
                    <Row>
                        <Col>
                        </Col>
                        <Col className="text-center mt-3">
                            <h3>Регистрация</h3>
                        </Col>
                                <Col className="text-right">
                                    <Button variant="outline-dark" size="sm" onClick={() => { this.hideModal() }}>
                                X
                                </Button>
                        </Col>
                    </Row>
                </Container>

            </Modal.Body>
         </Modal>
         </>
        );
    }

    hideModal() {
        
    }
}