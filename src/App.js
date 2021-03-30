import React from 'react'
import Login from './components/Login/Login'
import GetGroups from './components/ApiCalls/GetGroups'
import GetUsers from './components/ApiCalls/GetUsers'



const App = () => {
    sessionStorage.setItem('BASE_URL', "https://sandpit-api.safetyculture.io")

    return(
        <div>
        <Login></Login>
        <p>Log in to use these super cool features: </p>
        <GetGroups></GetGroups>
        <GetUsers></GetUsers>
        </div>
    )
}

export default App