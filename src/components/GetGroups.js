import React, {useState} from 'react'

const GetGroups = () => {
    const [groupState, setGroupState] = useState([])
    const BASE_URL = "https://sandpit-api.safetyculture.io"

    const buttonClicked = () => {
        let url = BASE_URL + '/share/connections'
    fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + sessionStorage.getItem('apiToken')
        }
    }).then(response => {
        return response.json()
    }).then(data => {
    //   console.log(data)
      setGroupState(data)
      console.log(typeof groupState)
    }).catch(error => console.log(error))
    }


    return (
       <div>
           <button onClick={buttonClicked}>Get Groups</button>
           <div>

               {/* <ul>
                   {groupState.map((group) => {
                       return <li key={group}>{group}</li>
                   })}
               </ul> */}

           </div>
       </div>
    )
}

export default GetGroups