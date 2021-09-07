import { useEffect, useState } from "react";
import { Button, Carousel, Col, Container, Figure, Row } from "react-bootstrap";



export default function AdPage() {

    const [ad, setAd] = useState(JSON.parse(localStorage.getItem("ad")))
    const [photos, setPhotos] = useState(ad.itemPhotosUrls.unshift(ad.adCoverUrl))
   
    

    return (
        <Container fluid>
            <Row className="mt-3">
                <Col>
                    <Carousel>
                        {ad.itemPhotosUrls.map(url => (
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={url}
                                    alt="item_photo"
                                />
                            </Carousel.Item>
                            ))}
                    </Carousel>
                </Col>
                <Col></Col>
            </Row>
        </Container>

    )
}