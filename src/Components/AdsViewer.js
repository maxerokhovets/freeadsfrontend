import { Card, Row } from "react-bootstrap"

export default function AdsViewer(props) {

    

    const renderCard = (ad, index) => {
        return (
            <Card style={{ width: '15rem', cursor: "pointer"}} key={index}
                className="ml-3 mt-3 mb-3 mr-3">
                <Card.Link href="/ads/ad" onClick={() => {
                    ad.itemPhotosUrls.unshift(ad.adCoverUrl);
                    localStorage.removeItem("ad");
                    localStorage.setItem("ad", JSON.stringify(ad))
                }}>
                    <Card.Img variant="top" src={ad.adCoverUrl} />
                    <Card.Body>
                        <Card.Title><font color="black">{ad.title}</font></Card.Title>
                        <Card.Text>
                            <font color="black">{ad.price}</font>
                        </Card.Text>
                    </Card.Body>
                </Card.Link>
            </Card>
        )
    }

    return (
        <Row>
            {props.arg.map(renderCard)}
        </Row>
    )

}