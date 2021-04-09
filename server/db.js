const Pool = require("pg").Pool;

// Connection details for the database
const pool = new Pool({
    user: "postgres",
    password: "M@ccat3ch",
    host: "localhost",
    port: 5432,
    database: "sc_database"
})

module.exports = pool;