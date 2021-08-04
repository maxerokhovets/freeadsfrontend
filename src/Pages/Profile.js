import { useEffect, useRef, useState } from "react";
import { Container, Row, Figure, Col, Button } from "react-bootstrap";
import emptyAva from './emptyAvatar.png';

export default function Profile() {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")

    useEffect(loadCurrentUserProfile, [])

    async function loadCurrentUserProfile() {
        const url = "https://localhost:1000/user/me"
        const authHeader = 'Bearer ' + localStorage.getItem("ACCESS_TOKEN")
        const result = await fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": 'application/JSON',
                "Accept": 'application/JSON',
                "Authorization":  authHeader 
            }
        })
        const response = await result.json()
        setUsername(response.username)
        setEmail(response.email)
        console.log(response)
    }

    return (
        <Container fluid>
            <Row>
                <Col className="text-center mt-5">
                    <Figure>
                        <Figure.Image
                            width={171}
                            height={180}
                            alt="171x180"
                            src={emptyAva}
                        />
                        <Figure.Caption>
                            На сайте с
                        </Figure.Caption>
                    </Figure>
                </Col>
                <Col className="text-left mt-5">
                    <h3>{username}</h3>
                    <h3>{email}</h3>
                </Col>
            </Row>
            <Row>
                <Col className="text-center mt-3">
                    <Button variant="dark" size="sm">
                        Изменить изображение профиля
                    </Button>
                </Col>
                <Col></Col>
            </Row>
        </Container>
    )
}