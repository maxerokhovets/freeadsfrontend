import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './Components/Header';
import React, { useState } from "react"
import AuthHeader from './Components/AuthHeader';

function App() {

    var isAuthenticated = null

    if (localStorage.getItem("ACCESS_TOKEN") != null) {
        isAuthenticated = true
    } else {
        isAuthenticated = false
    }

    if (!isAuthenticated) {
        return <Header auth={isAuthenticated} />
    } else {
        return <AuthHeader auth={isAuthenticated} />
    }
    
}

export default App;
