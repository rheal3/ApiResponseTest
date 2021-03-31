export const storeData = (newObj) => {
    if (!localStorage['saveData']) {
        let saveData = [];
        localStorage.setItem('saveData', JSON.stringify(saveData))
    }
    let storedData = JSON.parse(localStorage.getItem('saveData'))
    storedData.push(newObj)
    localStorage.setItem('saveData', JSON.stringify(storedData))
    // return alert("data saved")
}

export const dateTime = () => {
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return date + ' ' + time;
}
