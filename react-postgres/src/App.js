import React from 'react'
import Login from './components/Login/Login'
import AutomatedTest from './components/ResponseTests/AutomatedTest'


import Navbar from './components/Navbar'
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Results from './components/Results/Results'

const App = () => {
    sessionStorage.setItem('BASE_URL', "https://sandpit-api.safetyculture.io")

    return(
        <BrowserRouter>
            <Navbar />
            <div style={{ marginTop: 40 }}>
                <Switch>
                    <Route exact path="/">
                        <AutomatedTest />
                    </Route>
                    <Route path="/results_history">
                        <Results />
                    </Route>
                </Switch>
            </div>
        </BrowserRouter>
        
        // <div>
        // <Login/>
        // <AutomatedTest/>  
        // </div>
    )
}

export default App