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
    )
}

export default App