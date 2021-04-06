// export const storeData = (newObj) => {
//     if (!localStorage['saveData']) {
//         let saveData = [];
//         localStorage.setItem('saveData', JSON.stringify(saveData))
//     }
//     let storedData = JSON.parse(localStorage.getItem('saveData'))
//     storedData.push(newObj)
//     localStorage.setItem('saveData', JSON.stringify(storedData))
//     // return alert("data saved")
// }

export const dateTime = () => {
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return date + ' ' + time;
}

export const storeData = async (data) => {
    // tableName, responseOk, time, numItemsRetrieved, dateTime
    try {
        // const body = { data };
        const response = await fetch('http://localhost:5000/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        // console.log(response)
    } catch (err) {
        console.log(err.message)
    }
}

export const getData = async (tableName) => {
    try {
        const response = await fetch(`http://localhost:5000/${tableName}`);
        const jsonData = await response.json();

        console.log(jsonData);
    } catch (err) {
        console.log(err.message);
    }
}

export const getLastDataPointTime = async (tableName) => {
    try {
        const response = await fetch(`http://localhost:5000/${tableName}/last`);
        const jsonData = await response.json();
        console.log(jsonData[0]['time'])
        return jsonData[0]['time'];
    } catch (err) {
        console.log(err.message);
    }
}