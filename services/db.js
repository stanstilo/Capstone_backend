const conStr = "postgres://me:password@localhost:2700/api";
const pg = require("pg");
const {Pool} = require("pg");

const pool = new pg.Pool({
  connectionString: conStr
});
pool.on('connect', () => {
  console.log('connected to the Database');
});


  const user = (hash_pass) => {
    const myTable = `CREATE TABLE IF NOT EXISTS
        users(
           id serial PRIMARY KEY,
           email VARCHAR(128) NOT NULL,
           password hash NOT NULL          
        )`;
  
      pool.query(myTable)
       .then((res) => {
         console.log(res);
         pool.end();
        })
        .catch((err) => {
        console.log(err);
        pool.end();
        });
      }
     
    //SIGNUP
    // const myTable = `CREATE TABLE IF NOT EXISTS
    //     workers(
    //        users_id serial PRIMARY KEY,
    //        first_name VARCHAR(128) NOT NULL,
    //        last_name VARCHAR(128) NOT NULL,
    //        email VARCHAR(128) NOT NULL,
    //        password VARCHAR(128) NOT NULL,
    //        gender VARCHAR(128) NOT NULL,
    //        job VARCHAR(128) NOT NULL,
    //        dept VARCHAR(128) NOT NULL,
    //        address VARCHAR(128) NOT NULL
              // UNIQUE(email)
    //     )`;
  
    //   pool.query(myTable)
    //    .then((res) => {
    //      console.log(res);
    //      pool.end();
    //     })
    //     .catch((err) => {
    //     console.log(err);
    //     pool.end();
    //     });
               
  

    //articles
  
          //  const usersTable = `CREATE TABLE IF NOT EXISTS
          //  articles(
          //   id serial PRIMARY KEY,
          //   title text NOT NULL,
          //   article text NOT NULL,
          //   created_date timestamp NOT NULL, 
          //   author VARCHAR(128) NOT NULL,
          //   comment text NOT NULL
          //  )`;
        //  pool.query(usersTable)
        //  .then((res) => {
        //    console.log(res);
        //    pool.end();
        //  })
        //  .catch((err) => {
        //    console.log(err);
        //    pool.end();
        //  });
      
        // pool.on('remove', () => {
        //   console.log('client removed');
        //   process.exit(0);
        // });


  //export pool and Thing to be accessible  from any where within the application
  module.exports = {
    user,
    pool,
  };
 require('make-runnable') 
 