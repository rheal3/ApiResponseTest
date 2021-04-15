// gets the date and time to be used for timestamping the data
export const dateTime = () => {
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return date + ' ' + time;
}

// handles how the data gets stored to the database
export const storeData = async (data) => {
    // tableName, responseOk, time, numItemsRetrieved, dateTime
    try {
        await fetch('http://localhost:5000/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
    } catch (err) {
        console.log(err.message)
    }
}
