import { useEffect, useState } from "react"
import { Container, Row, Figure, Col, Button } from "react-bootstrap"
import SetProfilePhotoModal from "../Components/SetProfilePhotoModal"
import emptyAva from './emptyAvatar.png'

export default function Profile() {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [registrationDate, setRegistrationDate] = useState("")
    const [addsCount, setAddsCount] = useState("")
    const [avatarUrl, setAvatarUrl] = useState(null)
    const [showSetPhotoModal, setShowPhotoModal] = useState(false)
    const handleSetPhotoModal = () => setShowPhotoModal(!showSetPhotoModal)


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
        let dateArr1 = response.registrationDate.split("-")
        let dateArr2 = dateArr1[2].split("T")
        setRegistrationDate(dateArr2[0] + "." + dateArr1[1] + "." + dateArr1[0])
        setAddsCount(response.addsCount)
        if (response.profilePhotoUrl != null) {
            setAvatarUrl(response.profilePhotoUrl)
        } else {
            setAvatarUrl(emptyAva)
        }
        
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
                            src={avatarUrl}
                        />
                        <Figure.Caption>
                            На сайте с {registrationDate}
                        </Figure.Caption>
                    </Figure>
                </Col>
                <Col className="text-left mt-5">
                    <h1 className="mb-5">{username}</h1>
                    <font color="grey">Адрес электронной почты</font>
                    <h5>{email}</h5>
                    <h5 className="mt-5">Объявлений опубликовано: {addsCount}</h5>
                </Col>
            </Row>
            <Row>
                <Col className="text-center mt-3">
                    <SetProfilePhotoModal show={showSetPhotoModal} handle={handleSetPhotoModal} avatar={avatarUrl} />
                    <Button variant="dark" size="sm" onClick={handleSetPhotoModal}>
                        Изменить фотографию профиля
                    </Button>
                </Col>
                <Col></Col>
            </Row>
        </Container>
    )
}