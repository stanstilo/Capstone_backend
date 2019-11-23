/* eslint-disable linebreak-style */

/* eslint-disable no-console */
/* eslint-disable linebreak-style */

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const conStr = "postgres://me:password@localhost:2700/api";
const pg = require("pg");
const {Pool} = require("pg");

const pool = new pg.Pool({
  connectionString: conStr
});


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/auth/create-user", function(req, res, next) {
  pool.connect((err, client, done) => {
    if (err) {
      console.log("not able to get connection " + err);
      res.status(400).send(err);
    }
    client.query("SELECT * FROM workers", (err, result) => {
      done();
      if (err) {
        console.log(err);
        res.status(400).send(err);
      }
      res.status(200).send(result.rows);
    });
  });
});
app.get("/student", (req, res) => {
  pool.connect((err, client, done) => {
    const query = "SELECT * FROM students";
    client.query(query, (error, result) => {
      done();
      if (error) {
        res.status(400).json({ error });
      }
      if (result.rows < "1") {
        res.status(404).send({
          status: "Failed",
          message: "No student information found"
        });
      } else {
        res.status(200).send({
          status: "Successful",
          message: "Students Information retrieved",
          students: result.rows
        });
      }
    });
  });
});

app.post('/auth/create-user', (req, res,next) => {
  const data = {
    first_name:req.body.first_name,
    last_name:req.body.last_name,
    email:req.body.email,
     password:req.body.password,
     gender:req.body.gender,
     job:req.body.job,
     dept:req.body.dept,
     address:req.body.address,
     
     
     }
    pool.connect((err, client, done) => {
      const query = 'INSERT INTO workers(first_name, last_name, email, password, gender, job, dept, address) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *';
      const values = [data.first_name, data.last_name, data.email, data.password, data.gender, data.job, data.dept, data.address];
      client.query(query, values, (error, result) => {
        done();
        if (error) {
          res.status(400).json({error});
        }
        res.status(202).send({
          status: 'Successful',
          message: 'User account successfully created',
          result: result.rows[0],

        });
        client.end()
      });
    });
      });

module.exports = app;
