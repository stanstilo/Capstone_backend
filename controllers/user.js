  const pool = require('../services/connection')
   const bcrypt = require('bcryptjs')
   //const user = require('../services/db')


  exports.createThing = (req, res, next) => {
    const data = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
      gender: req.body.gender,
      job: req.body.job,
      dept: req.body.dept,
      address: req.body.address
    };

    class User{
      constructor(email, password){
      this.email = email,
      this.password=password
    }
  }
    
    pool.connect((err, client, done) => {

      bcrypt.hash(req.body.password, 10).then(
        (hash) => {  
       let user = new User(req.body.email, hash) 
          console.log(hash)
        
        const query =
        "INSERT INTO workers(first_name, last_name, email, password, gender, job, dept, address) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *";
      const values = [
        data.first_name,
        data.last_name,
        user.email,
        user.password,
        data.gender,
        data.job,
        data.dept,
        data.address
      ];
      client.query(query, values, (error, result) => {
        done();
        if (error) {
          res.status(400).json({ error })
        }
        res.status(202).send({
          status: "Success",
          data: {
            message: "User account successfully created",
            userId: result.rows[0].users_id
          }
        });
      });
    }
    )
    
  });
  }



  exports.postSignin = (req, res, next) => {  
    class User{
      constructor(email, password){
      this.email = email,
      this.password = password
    }
  }

  pool.connect((err, client, done) => {
    bcrypt.hash(req.body.password, 10).then(
        (hash) => {  
        let user = new User(req.body.email, hash) 
         console.log(hash)
        const query =
         "INSERT INTO users(email, password) VALUES($1, $2) RETURNING *";
        
       const values = [user.email, user.password];

       client.query( query, values, (error, result) => {
       done();
       
     const users = (user) => {
      if (!user) {
        return res.status(401).json({
          error: new Error('User not found!')
        });
      }
      if (error) {
        res.status(400).json({ error })
      }
      res.status(202).send({
        status: "Success",
        data: {
          token:'token',
          userId: result.rows[0].users_id
        }
      });
      
    
    bcrypt.compare(req.body.password, user.password).then(
      (valid) => {
        if (!valid) {
          return res.status(401).json({
            error: new Error('Incorrect password!')
          });
        }
          const token = jwt.sign(
            { userId: user.users_id },
            'RANDOM_TOKEN_SECRET',
            { expiresIn: '24h' });
    })
  }
  users(user)

     })
    })   
  })
}


  
  // bcrypt.compare(req.body.password, user.password).then(
  //   (valid) => {
  //     if (!valid) {
  //       return res.status(401).json({
  //         error: new Error('Incorrect password!')
  //       });
  //     }
  //       const token = jwt.sign(
  //         { userId: user.users_id },
  //         'RANDOM_TOKEN_SECRET',
  //         { expiresIn: '24h' });
  //       res.status(200).json({
  //         //userId: user.users_id,
  //         token: 'token'
  //       });

  //   }
  // ).catch(
  //   (error) => {
  //     res.status(500).json({
  //       error: error
  //     });
  //   }
  // )
     