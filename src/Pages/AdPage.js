import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";



export default function AdPage() {

    const [ad, setAd] = useState(JSON.parse(localStorage.getItem("ad")))
    

    return (
        <Container fluid>
            <h1>{ad.title}</h1>
        </Container>

    )
}