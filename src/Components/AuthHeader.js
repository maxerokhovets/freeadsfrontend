import React, { useState } from 'react';
import { Navbar, Container, NavbarBrand, Nav, NavLink, Form, FormControl, Button, Dropdown } from 'react-bootstrap';
import logo from './logo192.png';
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
import searchIcon from './search-icon.png';
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
import Home from '../Pages/Home';
import About from '../Pages/About';
import Contacts from '../Pages/Contacts';
import Profile from '../Pages/Profile';
import AdCreationPage from '../Pages/AdCreationPage';
import MyAdsPage from '../Pages/MyAdsPage';
import AdPage from '../Pages/AdPage';



export default function AuthHeader() {

    const [redirectToMyAdsPage, setRedirectToMyAdsPage] = useState(false)
    const redirectHandler = () => setRedirectToMyAdsPage(!redirectToMyAdsPage)


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
                            <Button variant="light" size="sm" className="mr-3">
                                <img
                                    src={searchIcon}
                                    height="20"
                                    width="20"
                                    className="d-inline-block align-top"
                                    alt="Поиск"
                                />
                            </Button>
                        </Form>
                        <Dropdown>
                            <Dropdown.Toggle variant="outline-info">
                                Мой аккаунт
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="/profile">Профиль</Dropdown.Item>
                                <Dropdown.Item href="/createad">Добавить объявление</Dropdown.Item>
                                <Dropdown.Item href="/myads">Мои объявления</Dropdown.Item>
                                <Dropdown.Item>Сообщения</Dropdown.Item>
                                <Dropdown.Item onClick={signOut}>Выход</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </NavbarCollapse>
                </Container>
            </Navbar>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/about" component={About} />
                    <Route exact path="/contacts" component={Contacts} />
                    <Route exact path="/profile" component={Profile} />
                    <Route exact path="/createad">
                        {redirectToMyAdsPage ? <Redirect to="/myads" /> : <AdCreationPage redirect={redirectHandler} />}
                    </Route>
                    <Route exact path="/myads">
                        <MyAdsPage />
                    </Route>
                    <Route exact path="/ads/ad">
                        <AdPage />
                    </Route>  
                </Switch>
            </BrowserRouter>
        </>
        )

    async function signOut() {
        const url = "https://localhost:1000/auth/logout"
        await fetch(url)
        localStorage.removeItem("ACCESS_TOKEN")
        localStorage.removeItem("current_user")
        window.location.reload()
        }
}