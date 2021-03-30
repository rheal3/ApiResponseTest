import React from 'react'
import Login from './components/Login/Login'
// import GetGroups from './components/GetGroups'


const App = () => {
    sessionStorage.setItem('BASE_URL', "https://sandpit-api.safetyculture.io")

    return(
        <div>

        <Login></Login>
        {/* <GetGroups></GetGroups> */}

        </div>
    )
}

export default App