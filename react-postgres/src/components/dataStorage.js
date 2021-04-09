
export const dateTime = () => {
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return date + ' ' + time;
}

export const storeData = async (data) => {
    // tableName, responseOk, time, numItemsRetrieved, dateTime
    try {
        const response = await fetch('http://localhost:5000/', {
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

export const getData = async (tableName) => {
    try {
        const response = await fetch(`http://localhost:5000/${tableName}`);
        const jsonData = await response.json();

        return jsonData;
    } catch (err) {
        console.log(err.message);
    }
}

export const getLastDataPointTime = async (tableName) => {
    try {
        const response = await fetch(`http://localhost:5000/${tableName}/last`);
        const jsonData = await response.json();

        return jsonData[0];

    } catch (err) {
        console.log(err.message);
    }
}

export const getLoginDataPoint = async (status) => {
    try {
        const response = await fetch(`http://localhost:5000/login/${status}`);
        const jsonData = await response.json();

        return jsonData[0];

    } catch (err) {
        console.log(err.message);
    }
}

export const getDateTime = async (tableName) => {
    try {
        const response = await fetch(`http://localhost:5000/${tableName}/last`);
        const jsonData = await response.json();

        return jsonData[0]['date_time'];

    } catch (err) {
        console.log(err.message);
    }
}