import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import AdsViewer from '../Components/AdsViewer';


export default class Home extends Component {

    constructor() {
        super()
        this.state = { responseData: [] }
    }

    async componentDidMount() {
        const url = "https://localhost:1000/ads/getads"
        const response = await fetch(url)
        const data = await response.json()
        this.setState({ responseData: data.reverse() })
    }

    render() {
        const ads = this.state.responseData
        return (
            <Container fluid>
                <AdsViewer arg={ads} />
            </Container>
        )
    }
}