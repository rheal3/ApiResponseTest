import React from 'react'
import Login from './Login/Login'
import AutomatedTest from './ResponseTests/AutomatedTest'

const App = () => {
    sessionStorage.setItem('BASE_URL', "https://sandpit-api.safetyculture.io")


    return(
        <div>

        <Login/>

        <AutomatedTest/>
   
        </div>
    )
}

export default App