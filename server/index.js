const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// middleware - connect to client side
app.use(cors())
app.use(express.json());


// Routes //

// add data to database
app.post("/", async (req, res) => { // request from client side and response sent back to client
  try {
    const { tableName, responseOk, time, numItemsRetrieved, dateTime } = req.body; // set from body of the request
    let queryStr = `INSERT INTO ${tableName} (response_ok, time, num_items_retrieved, date_time) VALUES ($1, $2, $3, $4) RETURNING *`
    const newData = await pool.query(queryStr, [responseOk, time, numItemsRetrieved, dateTime]);
    res.json(newData.rows);
  } catch(err) {
      console.error("post: " + err.message);
  }
})


// get all data from a certain table
app.get("/:tableName", async (req, res) => {
  try {
    const { tableName } = req.params; // set equal to the body of the request
    const allData = await pool.query(`SELECT * FROM ${tableName}`);
    res.json(allData.rows);
  } catch(err) {
      console.error("table: " + err.message);
  }
})


// get last item entered in data for certain table
app.get("/:tableName/last", async (req, res) => {
  try {
    const { tableName } = req.params; // set equal to the body of the request
    const allData = await pool.query(`SELECT * FROM ${tableName} ORDER BY id DESC LIMIT 1`);
    res.json(allData.rows);
  } catch(err) {
      console.error("last: " + err.message);
  }
})

// get last two login data points
app.get("/login/:status", async (req, res) => {
  try {
    const { status } = req.params; // set equal to the body of the request
    const allData = await pool.query(`SELECT * FROM access_token WHERE response_ok = ${status} ORDER BY id DESC LIMIT 1`);
    res.json(allData.rows);
  } catch(err) {
      console.error("last: " + err.message);
  }
})

// get best time in current session for certain table starting at id
app.get("/:tableName/best/:id", async (req, res) => {
  try {
    const {tableName, id } = req.params;
    let queryStr = `SELECT * FROM ${tableName} WHERE id > ${id} - 1 ORDER BY time LIMIT 1`
    const allData = await pool.query(queryStr)
    res.json(allData.rows)
  } catch (err) {
    console.log('best: ' + err.message);
  }
})

// get worst time in current session for certain table starting at id
app.get("/:tableName/worst/:id", async (req, res) => {
  try {
    const {tableName, id } = req.params;
    let queryStr = `SELECT * FROM ${tableName} WHERE id > ${id} - 1 ORDER BY time DESC LIMIT 1`
    const allData = await pool.query(queryStr)
    res.json(allData.rows)
  } catch (err) {
    console.log('worst: ' + err.message);
  }
})

// get avg time in current session for certain table starting at id
app.get("/:tableName/avg/:id", async (req, res) => {
  try {
    const {tableName, id } = req.params;
    let queryStr = `SELECT AVG(time)::NUMERIC(10,2) FROM ${tableName} WHERE id > ${id} - 1 LIMIT 1`
    const allData = await pool.query(queryStr)
    res.json(allData.rows)
  } catch (err) {
    console.log('avg: ' + err.message);
  }
})


/* In hindsight, it would be best to spit up the access_token table into a fail 
and succeed table rather than having these extra calls to the database */
// get best time in current session starting at id -- access token 
app.get("/access_token/best/:id/:bool", async (req, res) => {
  try {
    const {id, bool } = req.params;
    let queryStr = `SELECT * FROM access_token WHERE response_ok = ${bool} AND id > ${id} - 1 ORDER BY time LIMIT 1`
    const allData = await pool.query(queryStr)
    res.json(allData.rows)
  } catch (err) {
    console.log('best - access_token: ' + err.message);
  }
})

// get worst time in current session starting at id -- access token
app.get("/access_token/worst/:id/:bool", async (req, res) => {
  try {
    const {id, bool } = req.params;
    let queryStr = `SELECT * FROM access_token WHERE response_ok = ${bool} AND id > ${id} - 1 ORDER BY time DESC LIMIT 1`
    const allData = await pool.query(queryStr)
    res.json(allData.rows)
  } catch (err) {
    console.log('worst - access_token: ' + err.message);
  }
})

// get avg time in current session starting at id -- access token
app.get("/access_token/avg/:id/:bool", async (req, res) => {
  try {
    const {id, bool } = req.params;
    let queryStr = `SELECT AVG(time)::NUMERIC(10,2) FROM access_token WHERE response_ok = ${bool} AND id > ${id} - 1 LIMIT 1`
    const allData = await pool.query(queryStr)
    res.json(allData.rows)
  } catch (err) {
    console.log('avg - access_token: ' + err.message);
  }
})


app.listen(5000, () => {
    console.log("Server started on port 5000.")
});
