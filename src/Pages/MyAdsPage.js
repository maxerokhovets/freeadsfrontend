import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import AdsViewer from "../Components/AdsViewer";


export default function MyAdsPage(props) {

    const [myAds, setMyAds] = useState([])    

    useEffect(getMyAds, [])

    async function getMyAds() {
        const url = "https://localhost:1000/ads/getads"
        const authHeader = 'Bearer ' + localStorage.getItem("ACCESS_TOKEN")
        const data = await fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": 'application/JSON',
                "Accept": 'application/JSON',
                "Authorization": authHeader
            }
        })
        const response = await data.json()
        setMyAds(response.filter(ad => ad.username === localStorage.getItem("current_user")).reverse())
    }

    return (
        <Container fluid>
            <AdsViewer arg={myAds} />
        </Container>



    )
}