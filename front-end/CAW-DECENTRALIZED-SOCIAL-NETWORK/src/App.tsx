import React from 'react'
import Router from "./routing/Router";
import {AppProviders} from "./components/utils/AppProviders";
import "./styles/css"


function App() {
    return (
        <AppProviders>
            <Router/>
        </AppProviders>
    )
}

export default App
