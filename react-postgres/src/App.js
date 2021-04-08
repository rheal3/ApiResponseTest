import React from 'react'
import Login from './components/Login/Login'
import AutomatedTest from './components/ResponseTests/AutomatedTest'
import MainChart from './components/Charts/MainChart'

const App = () => {
    sessionStorage.setItem('BASE_URL', "https://sandpit-api.safetyculture.io")

    return(
        <div>
            {/* <MainChart data={{labels: ['1','2','3'],
                 datasets: [{
                    label: 'Login Accept',
                    data: [1, 2, 3],
                    fill: false,
                    borderColor: [
                      'rgb(0, 200, 0)'
                    ],
                    tension: 0.1
                  }]
                
                }}></MainChart> */}
        <Login/>
        <AutomatedTest/>  
        </div>
    )
}

export default App