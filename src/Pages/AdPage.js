import { useState } from "react";
import { Button, Carousel, Col, Container, Row } from "react-bootstrap";
import UpdateAdModal from "../Components/UpdateAdModal";



export default function AdPage() {

    const [ad, setAd] = useState(JSON.parse(localStorage.getItem("ad")))
    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const handleUpdateModal = () => setShowUpdateModal(!showUpdateModal)
    

    return (
        <>
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
                <Col className="ml-5">
                    <Row><h2>{ad.title}</h2></Row>
                    <Row>{ad.description}</Row>
                    <Row>{ad.price === 0 ? <>Бесплатно</> : <>Цена: {ad.price}</>}</Row>
                    <Row><>Дата публикации: {ad.creationDate.split('T')[0]}</></Row>
                    <Row className="mt-5">
                        {ad.username === localStorage.getItem("current_user") ?
                            <><Button variant="outline-dark" className="mb-3">Добавить/Удалить фото</Button>
                                <Button className="ml-2 mb-3" variant="outline-primary" onClick={handleUpdateModal}>Редактировать</Button>
                                <Button className="ml-2 mb-3" variant="outline-danger">Скрыть объявление</Button></> :
                            <Button variant="outline-dark">Написать продавцу</Button>
                        }
                    </Row>
                </Col>
            </Row>
            </Container>
            <UpdateAdModal show={showUpdateModal} handle={handleUpdateModal} ad={ad} />
        </>

    )
}