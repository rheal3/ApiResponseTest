
export const getBestTime = async (idObj) => {
    try {
        let returnObj = {};
        for (const [tableName, id] of Object.entries(idObj)) {
            const response = await fetch(`http://localhost:5000/${tableName}/best/${id}`);
            const jsonData = await response.json();
            returnObj[tableName] = jsonData;
          }
        return returnObj;
        
    } catch (err) {
        console.log(err.message);
    }
}


export const getWorstTime = async (idObj) => {
    try {
        let returnObj = {};
        for (const [tableName, id] of Object.entries(idObj)) {
            const response = await fetch(`http://localhost:5000/${tableName}/worst/${id}`);
            const jsonData = await response.json();
            returnObj[tableName] = jsonData;
          }
        return returnObj;
        
    } catch (err) {
        console.log(err.message);
    }
}

// export const getAvgTime = async (idObj) => {
//     try {
//         let returnObj = {};
//         for (const [tableName, id] of Object.entries(idObj)) {
//             const response = await fetch(`http://localhost:5000/${tableName}/avg/${id}`);
//             const jsonData = await response.json();
//             returnObj[tableName] = jsonData;
//           }
//         console.log(returnObj)
//         return returnObj;
        
//     } catch (err) {
//         console.log(err.message);
//     }
// }