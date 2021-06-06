import React, { Component } from 'react';
import { Navbar, Container, NavbarBrand, Nav, NavLink, Form, FormControl, Button, Modal, Row, Col } from 'react-bootstrap';
import logo from './logo192.png';
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
import searchIcon from './search-icon.png';
import { Route, BrowserRouter, Switch, Link } from "react-router-dom";
import Home from '../Pages/Home';
import About from '../Pages/About';
import Contacts from '../Pages/Contacts';
import closeIcon from './close-icon.png';


export default class Header extends Component {
    constructor() {
        super()
        this.state = { show:false }
    }
    render() {
        return (
            <>
                <Navbar static="top" collapseOnSelect expand="md" bg="dark" variant="dark">
                    <Container>
                        <NavbarBrand href="/">
                            <img
                                src={logo}
                                height="30"
                                width="30"
                                className="d-inline-block align-top"
                                alt="Logo"
                            />
                        </NavbarBrand>
                        <NavbarToggle aria-controls="responsive-navbar-nav" />
                        <NavbarCollapse id="responsive-navbar-nav">
                            <Nav className="mr-auto">
                                <NavLink href="/">Объявления</NavLink>
                                <NavLink href="/about">Правила</NavLink>
                                <NavLink href="/contacts">Контакты</NavLink>
                            </Nav>

                            <Form inline>
                                <FormControl
                                    type="text"
                                    size="sm"
                                    placeholder="Искать на сайте"
                                    className="mr-sm-0"
                                />
                                <Button variant="light" size="sm">
                                    <img
                                        src={searchIcon}
                                        height="20"
                                        width="20"
                                        className="d-inline-block align-top"
                                        alt="Поиск"
                                    />
                                </Button>
                            </Form>
                            <Button className="ml-3" variant="outline-info" onClick={() => { this.handleModal() }}>Вход</Button>
                        </NavbarCollapse>
                    </Container>
                </Navbar>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/about" component={About} />
                        <Route exact path="/contacts" component={Contacts} />
                    </Switch>
                </BrowserRouter>
                <Modal show={this.state.show}
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
                                    <Button variant="outline-dark" size="sm" onClick={() => { this.handleModal() }}>
                                        X
                                    </Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="text-center mt-2">
                                    <h6>Нет аккаунта?<Button variant="link" size="sm"><h6>Зарегестрируйтесь здесь.</h6></Button></h6>
                                </Col>
                            </Row>
                        </Container>
                    </Modal.Body>
                </Modal>

            </>
        )
    }
    handleModal() {
        this.setState({ show: !this.state.show })
    }
}

