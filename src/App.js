import React from 'react'
import Login from './components/Login/Login'
import GetUSers from './components/ApiCalls/GetUsers'
import GetGroups from './components/ApiCalls/GetGroups'


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