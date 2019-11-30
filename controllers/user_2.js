const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const pool = require('../services/connection');

exports.postSignin = (req, res) => {
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

        const query = 'INSERT INTO users(email, password) VALUES($1, $2) RETURNING *';

        const values = [user.email, user.password];

        client.query(query, values, (error) => {
          done();


          const users = () => {
            bcrypt.compare(req.body.password, user.password).then(
              () => {
                // eslint-disable-next-line no-unused-vars
                const token = jwt.sign(
                  { userId: user.users_id },
                  'RANDOM_TOKEN_SECRET',
                  { expiresIn: '24h' },
                );
                if (error) {
                  res.status(400).json({ error });
                } else {
                  res.status(202).send({
                    status: 'Success',
                    data: {
                      token: 'token',
                      // userId: result.rows[0].users_id
                    },
                  });
                }
              },
            );
          };
          return users(user);
        });
      },
    );
  });
};
