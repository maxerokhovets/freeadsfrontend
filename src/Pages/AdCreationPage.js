import { useEffect, useState } from "react"
import { Alert, Col, Container, Form, Row, Figure } from "react-bootstrap"
import no_picture_available from './No_picture_available.png'


export default function AdCreationPage() {

    const [priceFieldDisabled, setPriceFieldDisabled] = useState(true)
    const [checkedRadio1, setCheckedRadio1] = useState(true)
    const [checkedRadio2, setCheckedRadio2] = useState(false)
    const [price, setPrice] = useState("0")
    const [cover, setCover] = useState(no_picture_available)
    const [coverFile, setCoverFile] = useState(null)

    const handleCover = (v) => {
        setCover(URL.createObjectURL(v))
        setCoverFile(v)
    }

    const handleRadios = () => {
        setCheckedRadio1(!checkedRadio1)
        setCheckedRadio2(!checkedRadio2)
        setPrice("0")
        setPriceFieldDisabled(!priceFieldDisabled)
    }

    useEffect(() => { document.title = 'Добавить объявление' })

    return (
        <Container fluid>
            <Row className="text-center mt-4 mb-3">
                <Col>
                    <h1>Создайте объявление</h1>
                </Col>
            </Row>
            <Row>
                <Col></Col>
                <Alert variant="dark">
                    <Col>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label><h4>1. Что вы хотите продать?*</h4></Form.Label>
                                <Form.Control type="text" />
                                <Form.Text className="text-muted">
                                    Опишите товар, используя минимум слов.
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3 mt-4">
                                <Form.Label><h4>2. Выберите категорию</h4></Form.Label>
                                <Form.Control as="select">
                                    <option>Без категории</option>
                                    <option>Недвижимость</option>
                                    <option>Авто и транспорт</option>
                                    <option>Бытовая техника</option>
                                    <option>Электроника</option>
                                    <option>Одежда</option>
                                    <option>Мебель</option>
                                    <option>Спорт</option>
                                    <option>Музыка</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3 mt-4">
                                <Form.Label><h4>3. Добавьте описание товара</h4></Form.Label>
                                <Form.Control as="textarea" rows="3" />
                            </Form.Group>
                            <Form.Group className="mb-3 mt-4">
                                <Form.Label><h4>4. Укажите цену</h4></Form.Label>
                                <Form.Check
                                    type="radio"
                                    name="group1"
                                    label="Бесплатно"
                                    className="mb-3"
                                    checked={checkedRadio1}
                                    onChange={handleRadios}
                                />

                                <Form.Check
                                    type="radio"
                                    name="group1"
                                    label="Установить цену"
                                    className="mb-3"
                                    checked={checkedRadio2}
                                    onChange={handleRadios}
                                />
                                <Form.Control type="text"
                                    value={price}
                                    onChange={(e) => { setPrice(e.target.value) }}
                                    disabled={priceFieldDisabled} />
                                <Form.Text className="text-muted">
                                   Если вы не укажете цену за товар, то он будет объявлен бесплатным. 
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3 mt-4">
                                <Form.Label><h4>5. Добавьте фото товара</h4></Form.Label>
                                <Row className="text-center">
                                    <Figure>
                                        <Figure.Image
                                            width={171}
                                            height={180}
                                            alt="171x180"
                                            src={cover}
                                        />
                                    </Figure>
                                </Row>
                                <Form.Control type="file" onChange={(e) => handleCover(e.target.files[0])} />
                                <Form.Text className="text-muted mt-2">
                                    Данное фото будет обложкой объявления.
                                </Form.Text>
                            </Form.Group>
                        </Form>
                    </Col>
                </Alert>
                <Col></Col>
            </Row>
        </Container>


    )
}