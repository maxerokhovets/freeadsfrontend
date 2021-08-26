import React, { Component } from 'react';


export default class Home extends Component {

    constructor() {
        super()
        this.state = { responseData: [] }
    }

    async componentDidMount() {
        const url = "https://localhost:1000/ads/getads"
        const response = await fetch(url)
        const data = await response.json()
        this.setState({ responseData: data })
    }

    render() {
        const ads = this.state.responseData
        return (
            <>
                {ads.map((ad) => <li key={ad.id}><h2>{ad.category}    {ad.title}   {ad.price}</h2></li>)}
               
            </>
        )
    }
}