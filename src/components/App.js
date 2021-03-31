import React from 'react'
import Login from './Login/Login'
import GetUSers from './ApiCalls/GetUsers'
import GetGroups from './ApiCalls/GetGroups'


const App = () => {
    sessionStorage.setItem('BASE_URL', "https://sandpit-api.safetyculture.io")

    return(
        <div>

        <Login></Login>
        <p>Log in to use these super cool features: </p>
        <GetGroups></GetGroups>
        <GetUSers></GetUSers>

        </div>
    )
}

export default App