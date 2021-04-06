const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// middleware - connect to client side
app.use(cors())
app.use(express.json());

// Routes //

// create data

// request from client side and response sent back to client
app.post("/", async (req, res) => {
  try {
    const { tableName, responseOk, time, numItemsRetrieved, dateTime } = req.body; // set from body of the request
    let queryStr = `INSERT INTO ${tableName} (response_ok, time, num_items_retrieved, date_time) VALUES ($1, $2, $3, $4) RETURNING *`
    const newData = await pool.query(queryStr, [responseOk, time, numItemsRetrieved, dateTime]);
    res.json(newData.rows);
  } catch(err) {
      console.error("post: " + err.message);
  }
})


// get data 
app.get("/:tableName", async (req, res) => {
  try {
    const { tableName } = req.params; // set equal to the body of the request
    const allData = await pool.query(`SELECT * FROM ${tableName}`);
    res.json(allData.rows);
  } catch(err) {
      console.error("table: " + err.message);
  }
})


// get last item entered in data
app.get("/:tableName/last", async (req, res) => {
  try {
    const { tableName } = req.params; // set equal to the body of the request
    const allData = await pool.query(`SELECT * FROM ${tableName} ORDER BY id DESC LIMIT 1`);
    res.json(allData.rows);
  } catch(err) {
      console.error("last: " + err.message);
  }
})

// get last two login 
app.get("/login/:status", async (req, res) => {
  try {
    const { status } = req.params; // set equal to the body of the request
    const allData = await pool.query(`SELECT * FROM access_token WHERE response_ok = ${status} ORDER BY id DESC LIMIT 1`);
    res.json(allData.rows);
  } catch(err) {
      console.error("last: " + err.message);
  }
})


app.listen(5000, () => {
    console.log("Server started on port 5000.")
});



// app.listen(port, () => {
//     console.log(`App running on port ${port}.`)
//   })