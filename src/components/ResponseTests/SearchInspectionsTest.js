import React, {useState} from 'react'
import SearchInspections from '../ApiCalls/SearchInspections'


const SearchInspectionsTest = () => {
    const [getInspectionTime, setInspectionTime] = useState('')

    const handleClick = async () => {
        await SearchInspections()

        setInspectionTime(JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 1]['time'])
    }
    return (
        <div>
            <div>
            <h3>Search Inspections response time test</h3>
            <button onClick={handleClick}>Search Inspections</button>
            </div>
            <p>Search Inspections Time: {getInspectionTime}</p>
            
        </div>
    )
}

export default SearchInspectionsTest