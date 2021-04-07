const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "M@ccat3ch",
    host: "localhost",
    port: 5432,
    database: "sc_database"
})

module.exports = pool;