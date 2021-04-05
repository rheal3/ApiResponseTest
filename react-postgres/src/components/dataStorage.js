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

export function storeData(data) {
    // tableName, responseOk, time, numItemsRetrieved, dateTime
    fetch('http://localhost:3001/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        console.log(response.json())
        return response.json();
    })
    .then(data => {
        alert(data);
    });
}
