import React, { Component } from 'react';
import { Navbar, Container, NavbarBrand, Nav, NavLink, Form, FormControl, Button } from 'react-bootstrap';
import logo from './logo192.png';
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
import searchIcon from './search-icon.png';
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
import Home from '../Pages/Home';
import About from '../Pages/About';
import Contacts from '../Pages/Contacts';
import LoginModal from './LoginModal';
import Profile from '../Pages/Profile';
import AdCreationPage from '../Pages/AdCreationPage';
import MyAdsPage from '../Pages/MyAdsPage';
import AdPage from '../Pages/AdPage';


export default class Header extends Component {
    constructor() {
        super()
        this.state = { showLoginModal: false, showRegistartion: false }
    }
    render() {
        return (
            <>
                <Navbar sticky="top" collapseOnSelect expand="md" bg="dark" variant="dark">
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
                            <Button className="ml-3" variant="outline-info" onClick={() =>this.handleLoginModal()}>Вход</Button>
                        </NavbarCollapse>
                    </Container>
                </Navbar>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/about" component={About} />
                        <Route exact path="/contacts" component={Contacts} />
                        <Route exact path="/profile">
                            {!this.props.auth ? <Redirect to="/" /> : <Profile />}
                        </Route>
                        <Route exact path="/createad">
                            {!this.props.auth ? <Redirect to="/" /> : <AdCreationPage />}
                        </Route>
                        <Route exact path="/myads">
                            {!this.props.auth ? <Redirect to="/" /> : <MyAdsPage />}
                        </Route>
                        <Route exact path="/ads/ad">
                            <AdPage />
                        </Route>
                    </Switch>
                </BrowserRouter>
                <LoginModal show={this.state.showLoginModal}
                            handle={() => this.handleLoginModal()}
                            auth={this.props.auth}
                            handleAuth={this.props.handleAuth}/>
                
            </>
        )
    }
    handleLoginModal() {
        this.setState({ showLoginModal: !this.state.showLoginModal })
    }
    registrationModal() {
        this.setState({ show: !this.state.show })
        this.setState({ showRegistartion: true })
    }
    hideRegistrationModal() {
        this.setState({ showRegistartion: false })
    }
    
    
}

