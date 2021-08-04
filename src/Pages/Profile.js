import { Container, Row, Figure, Col, Button } from "react-bootstrap";
import emptyAva from './emptyAvatar.png';

export default function Profile() {


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
                <Col></Col>
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