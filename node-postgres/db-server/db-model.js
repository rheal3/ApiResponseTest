const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "Fighting!",
    database: "sc_database",
    host: "localhost",
    port: "5432"
})

const postData = (body) => {
    return new Promise(function(resolve, reject) {
        const { tableName, responseOk, time, numItemsRetrieved, dateTime } = body; // set description equal to the body of the request

        pool.query(`INSERT INTO ${tableName} (response_ok, time, num_items_retrieved, date_time) VALUES (${responseOk}, ${time}, ${numItemsRetrieved}, ${dateTime}) RETURNING *`, 
        (error, results) => {
            if (error) {
            reject(error)
            }
            resolve(`A new merchant has been added added: ${JSON.stringify(results.rows[0])}`)
        })
    })
}

module.exports = {
    postData,
}