import { useState } from "react";
import { Modal, Row, Col, Button, Container, Form } from "react-bootstrap";


export default function UpdateAdModal(props) {

    const [title, setTitle] = useState(props.ad.title)
    const [description, setDescription] = useState(props.ad.description)
    const [category, setCategory] = useState(props.ad.category)
    const [price, setPrice] = useState(props.ad.price)
    const [adCoverUrl, setAdCoverUrl] = useState(props.ad.adCoverUrl)
    const [itemPhotosUrls, setItemphotosUrls] = useState(props.ad.itemPhotosUrls)
    const [isActive, setActive] = useState(props.ad.active)

    async function saveChanges() {
        if (title != props.ad.title ||
            description != props.ad.description ||
            price != props.ad.price) {

            const authHeader = 'Bearer ' + localStorage.getItem("ACCESS_TOKEN")

            const updateAdUrl = "https://localhost:1000/ads/updatead/" + props.ad.id
            itemPhotosUrls.shift()
            setItemphotosUrls(itemPhotosUrls)
            var request = { title, description, category, price, adCoverUrl, itemPhotosUrls, isActive }
            const response = await fetch(updateAdUrl, {
                method: 'PUT',
                body: JSON.stringify(request),
                headers: {
                    "Authorization": authHeader,
                    "Content-Type": 'application/JSON',
                    "Accept": 'application/JSON'
                }
            })
            var ad = await response.json()
            ad.itemPhotosUrls.unshift(ad.adCoverUrl)
            localStorage.removeItem("ad")
            localStorage.setItem("ad", JSON.stringify(ad))
            props.handle()
            window.location.reload()
        } else {
            props.handle()
        }
    }

    return (
        <Modal show={props.show}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <Container fluid>
                    <Row>
                        <Col>
                        </Col>
                        <Col className="text-center mt-3 mb-1">
                            <h3>Редактировать объявление</h3>
                        </Col>
                        <Col className="text-right">
                            <Button variant="outline-dark" size="sm" onClick={props.handle}>
                                X
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="text-left">
                            <Form>
                                <Form.Group className="mb-3 mt-3">
                                    <Form.Label className="text-left">Заголовок</Form.Label>
                                    <Form.Control onChange={(e) => setTitle(e.target.value)}
                                        value={title}
                                        type="text" />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="text-left">Описание</Form.Label>
                                    <Form.Control as="textarea"
                                        onChange={(e) => setDescription(e.target.value)}
                                        value={description}
                                        type="text" />
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label className="text-left">Цена</Form.Label>
                                    <Form.Control onChange={(e) => setPrice(e.target.value)}
                                        value={price} />
                                </Form.Group>

                                <Button variant="dark" size="lg" onClick={saveChanges}>
                                    Сохранить изменения
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>

            </Modal.Body>
        </Modal>


    )

}