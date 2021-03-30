import React from 'react'
import GetGroups from './components/GetGroups'
import Login from './components/Login/Login'


const App = () => {
    sessionStorage.setItem('BASE_URL', "https://sandpit-api.safetyculture.io")


    return(
        <div>

        <Login></Login>
        <GetGroups></GetGroups>

        </div>
    )
}

export default App