import React from 'react'
import AutomatedHistory from './components/AutomatedHistory/AutomatedHistory'
import Login from './components/Login/Login'


const App = () => {
    sessionStorage.setItem('BASE_URL', "https://sandpit-api.safetyculture.io")

    return(
        <div>
            <Login />
            <AutomatedHistory />
        </div>
        // <BrowserRouter>
        //     <Navbar />
        //     <div style={{ marginTop: 20 }}>
        //         <Switch>
        //             <Route exact path="/">
        //                 <AutomatedTest />
        //             </Route>
        //             <Route path="/results_history">
        //                 <Results />
        //             </Route>
        //         </Switch>
        //     </div>
        // </BrowserRouter>
    )
}

export default App