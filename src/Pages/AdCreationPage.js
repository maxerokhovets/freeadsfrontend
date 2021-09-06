import { useEffect, useState } from "react"
import { Alert, Col, Container, Form, Row, Figure, Button } from "react-bootstrap"
import no_picture_available from './No_picture_available.png'


export default function AdCreationPage(props) {

    const [priceFieldDisabled, setPriceFieldDisabled] = useState(true)
    const [checkedRadio1, setCheckedRadio1] = useState(true)
    const [checkedRadio2, setCheckedRadio2] = useState(false)
    const [price, setPrice] = useState("0")
    const [cover, setCover] = useState(no_picture_available)
    const [coverFile, setCoverFile] = useState(null)
    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("Без категории")
    const [description, setDescription] = useState("")
    const [message, setMessage] = useState("")

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

    async function createAd() {
        setMessage("")
        if (coverFile === null) {
            setMessage("Для публикации объявления заполните обязательные поля.")
        } else {
            const authHeader = 'Bearer ' + localStorage.getItem("ACCESS_TOKEN")
            const createAdUrl = "https://localhost:1000/ads/createad"
            const formData = new FormData()
            formData.append('title', title)
            formData.append('category', category)
            formData.append('description', description)
            formData.append('price', price)
            formData.append('cover', coverFile)

            let data = await fetch(createAdUrl, {
                method: 'POST',
                body: formData,
                headers: {
                    "Authorization": authHeader
                }
            })
            const createAdResponse = await data.json()
            if (createAdResponse.success === false) {
                setMessage(createAdResponse.message)
            } else {
                props.redirect()
            }
 
        }

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
                                <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                                <Form.Text className="text-muted">
                                    Опишите товар, используя минимум слов.
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3 mt-4">
                                <Form.Label><h4>2. Выберите категорию</h4></Form.Label>
                                <Form.Control as="select" value={category} onChange={(e) => setCategory(e.target.value)}>
                                    <option>Без категории</option>
                                    <option>Недвижимость</option>
                                    <option>Авто и транспорт</option>
                                    <option>Бытовая техника</option>
                                    <option>Электроника</option>
                                    <option>Одежда</option>
                                    <option>Мебель</option>
                                    <option>Спорт</option>
                                    <option>Музыка</option>
                                    <option>Книги</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3 mt-4">
                                <Form.Label><h4>3. Добавьте описание товара</h4></Form.Label>
                                <Form.Control as="textarea"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    rows="3" />
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
                                <Form.Label><h4>5. Добавьте фото товара*</h4></Form.Label>
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
                                <Form.Control type="file" accept="image/*" onChange={(e) => handleCover(e.target.files[0])} />
                                <Form.Text className="text-muted mt-2">
                                    Данное фото будет обложкой объявления. Больше фото можно
                                </Form.Text>
                                <Form.Text className="text-muted">
                                    будет добавить на странице редактирования объявления.
                                </Form.Text>
                                <Form.Text className="mt-4">
                                    <h5>* - поля обязательные для заполнения</h5>
                                </Form.Text>
                                <font color="red" size="4" className="mb-1">{message}</font>
                            </Form.Group>
                            <Button className="mt-3"
                                onClick={createAd}
                                size="lg"
                                variant="dark">Опубликовать</Button>
                        </Form>
                    </Col>
                </Alert>
                <Col></Col>
            </Row>
        </Container>


    )
}