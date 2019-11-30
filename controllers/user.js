// eslint-disable-next-line no-unused-vars
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const pool = require('../services/connection');


exports.createThing = (req, res) => {
  const data = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    gender: req.body.gender,
    job: req.body.job,
    dept: req.body.dept,
    address: req.body.address,
  };

  class User {
    constructor(email, password) {
      this.email = email;
      this.password = password;
    }
  }

  pool.connect((err, client, done) => {
    bcrypt.hash(req.body.password, 10).then(
      (hash) => {
        const user = new User(req.body.email, hash);


        const query = 'INSERT INTO workers(first_name, last_name, email, password, gender, job, dept, address) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *';
        const values = [
          data.first_name,
          data.last_name,
          user.email,
          user.password,
          data.gender,
          data.job,
          data.dept,
          data.address,
        ];
        client.query(query, values, (error, result) => {
          done();
          if (error) {
            res.status(400).json({ error });
          }
          res.status(202).send({
            status: 'Success',
            data: {
              message: 'User account successfully created',
              userId: result.rows[0].users_id,
            },
          });
        });
      },
    );
  });
};
