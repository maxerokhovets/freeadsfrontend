import { useState } from "react"
import { Modal, Button, Form, Figure } from "react-bootstrap"

export default function SetProfilePhotoModal(props) {

    const [newImage, setNewImage] = useState(null)
    const [disabled, setDisabled] = useState(true)
    const [message, setMessage] = useState("")

    let image = null
    if (newImage == null) {
        image = props.avatar
    } else {
        image = URL.createObjectURL(newImage)
    }
    
    const handleNewImage = (v) => {
        setNewImage(v)
        setDisabled(false)
        setMessage("")
    }

    const closeThisModal = () => {
        setNewImage(null)
        setDisabled(true)
        setMessage("")
        props.handle()
    }

    async function saveNewProfilePhoto() {
        const authHeader = 'Bearer ' + localStorage.getItem("ACCESS_TOKEN")

        const uploadPhotoUrl = "https://localhost:1000/user/setphoto"
        const uploadPhotoRequestBody = new FormData()
        uploadPhotoRequestBody.append('file', newImage)
        const data = await fetch(uploadPhotoUrl, {
            method: 'POST',
            body: uploadPhotoRequestBody,
            headers: {
                "Authorization": authHeader
            }
        })
        const uploadPhotoResponse = await data.json()

        if (uploadPhotoResponse.success == false) {
            setMessage(uploadPhotoResponse.message)
        }

        if (uploadPhotoResponse.success == true) {
            const deleteUrl = "https://localhost:1000/user/deletephoto"
            const presentPhotoUrl = props.avatar
            const deleteRequestBody = new FormData()
            deleteRequestBody.append('url', presentPhotoUrl)
            await fetch(deleteUrl, {
                method: 'DELETE',
                body: deleteRequestBody,
                headers: {
                    "Authorization": authHeader
                }
            })

            props.handle()
            window.location.reload()
        }

        setDisabled(true)
    }

    return (
        <Modal show={props.show}>
            <Modal.Header>
                <Modal.Title>Выберите изображение</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
                <Figure>
                    <Figure.Image
                        width={171}
                        height={180}
                        alt="171x180"
                        src={image}
                    />
                </Figure>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Control type="file" onChange={(e) => { handleNewImage(e.target.files[0])}} />
                </Form.Group>
                <font color="red" size="4" className="mb-1">{message}</font>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="dark" onClick={closeThisModal}>
                    Закрыть
                </Button>
                <Button variant="primary" disabled={disabled} onClick={saveNewProfilePhoto}>
                    Сохранить
                </Button>
            </Modal.Footer>
        </Modal>  
    )
}