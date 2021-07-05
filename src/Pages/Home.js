import React, { Component } from 'react';


export default class Home extends Component {

    constructor() {
        super()
        this.state = { responseData: null }
    }

    async componentDidMount() {
        const url = "https://localhost:1000/ads"
        const response = await fetch(url)
        const data = await response.json()
        this.setState({ responseData: data[0].caption })
    }

    render() {
        return (
            <>
                <h1>{this.state.responseData}</h1>
               
            </>
        )
    }
}