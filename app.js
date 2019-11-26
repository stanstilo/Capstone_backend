/* eslint-disable linebreak-style */

/* eslint-disable no-console */
/* eslint-disable linebreak-style */

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const conStr = "postgres://me:password@localhost:2700/api";
const pg = require("pg");
const { Pool } = require("pg");

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

app.get("/articles", function(req, res, next) {
  pool.connect((err, client, done) => {
    if (err) {
      console.log("not able to get connection " + err);
      res.status(400).send(err);
    }
    client.query("SELECT * FROM articles ORDER BY id DESC", (err, result) => {
      done();
      if (err) {
        console.log(err);
        res.status(400).send(err);
      }
      res.status(200).send(result.rows);
    });
  });
});


app.post("/auth/create-user", (req, res, next) => {
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
  pool.connect((err, client, done) => {
    const query =
      "INSERT INTO workers(first_name, last_name, email, password, gender, job, dept, address) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *";
    const values = [
      data.first_name,
      data.last_name,
      data.email,
      data.password,
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
  });
});


app.post("/auth/signin", (req, res, next) => {
 
  const userData = {
    email: req.body.email,
    password: req.body.password,
  };
  pool.connect((err, client, done) => {
    const query =
      "INSERT INTO users(email, password) VALUES($1,$2) RETURNING *";
    const values = [userData.email, userData.password];
    client.query(query, values, (error, result) => {
      done();
      if (error) {
        res.status(400).json({ error });
      }
      res.status(202).send({
        status: "success",
        data: {
          
          userId: result.rows[0].users_id
        }
      });
    });
  });
});

app.post("/gifs", (req, res, next) => {
  let thisTime = new Date();
  const userData = {
    image: req.body.image,
    title: req.body.title
  };
  pool.connect((err, client, done) => {
    const query =
      "INSERT INTO gifs(title, url,created_date) Values($1,$2,$3)RETURNING *";
    const values = [userData.image, userData.title, thisTime];
    client.query(query, values, (error, result) => {
      done();
      if (error) {
        res.status(400).json({ error });
      }
      res.status(202).send({
        status: "success",
        data: {
          gifId:result.rows[0].id,
          message: "Gif image successfully posted",
          createdOn: thisTime,
          imageUrl: result.rows[0].url,
          title:result.rows[0].title
        }
      });
    });
  })
})




app.post("/articles", (req, res, next) => {
  let thisTime = new Date();
  const userData = {
    article: req.body.article,
    title: req.body.title
  };
  pool.connect((err, client, done) => {
    const query =
      "INSERT INTO articles(article, title, created_date) VALUES($1,$2, $3) RETURNING *";
    const values = [userData.article, userData.title, thisTime];
    client.query(query, values, (error, result) => {
      done();
      if (error) {
        res.status(400).json({ error });
      }
      res.status(202).send({
        status: "success",
        data: {
          message: "Article successfully posted",
          createdOn: thisTime,
          articleId: result.rows[0].id,
          title:result.rows[0].title
         
        }
      });
    });

    app.patch("/articles/:articleId", (req, res, next) => {
      let Id = parseInt(req.params.articleId);
      let thisTime = new Date();
      const title = req.body.title;
      const article = req.body.article;
      pool.connect((err, client, done) => {
        const query =
          "UPDATE articles SET title = $1, article = $2, created_date =$3 where id = $4 RETURNING *";
        const values = [title, article, thisTime, Id];
        client.query(query, values, (error, result) => {
          done();
          if (error) {
            res.status(400).json({ error });
            return;
          }
          res.status(202).send({
            status: "success",
            data: {
              message: "Comment successfully created",
              title: result.rows[0].title,
              article: result.rows[0].article        
            }
          });
        });
      });
    });
        


    app.delete("/articles/:articleId", (req, res, next) => {
      let Id = parseInt(req.params.articleId);
      
      pool.connect((err, client, done) => {
        const query = "delete from articles where id = $1";
        const values = [Id];
        client.query(query, values, (error, result) => {
          done();
          if (error) {
            res.status(400).json({ error });
          }
          res.status(202).send({
            status: "Successful",
            data: {
              message: `Article with id ${Id} was deleted successfully`
            }
          });
        });
      });
    });
    
    app.delete("/gifs/:gifId", (req, res, next) => {
      let Id = parseInt(req.params.gifId);
      
      pool.connect((err, client, done) => {
        const query = "delete from gifs where id = $1";
        const values = [Id];
        client.query(query, values, (error, result) => {
          done();
          if (error) {
            res.status(400).json({ error });
          }
          res.status(202).send({
            status: "success",
            data: {
              message: `gif post with id ${Id} was deleted successfully`
            }
          });
        });
      });
    });
    
    app.post("/articles/:articleId/comment", (req, res, next) => {
      let Id = parseInt(req.params.articleId);
      let thisTime = new Date();
      const comment = req.body.comment;
      pool.connect((err, client, done) => {
        const query =
          "UPDATE articles SET comment = $1, created_date =$2  WHERE id=$3 RETURNING *";
        const values = [comment, thisTime, Id];
        client.query(query, values, (error, result) => {
          done();
          if (error) {
            res.status(400).json({ error });
            return;
          }
    
          res.status(202).send({
            status: "success",
            data: {
              message: "Comment successfully created",
              createdOn: thisTime,
              articleTitle: result.rows[0].title,
              article: result.rows[0].article,
              comment: result.rows[0].comment
            }
          });
        });
      });
    });
  });
});


app.post("/gifs/:gifId/comment", (req, res, next) => {
  let Id = parseInt(req.params.gifId);
  let thisTime = new Date();
  const comment = req.body.comment;
  pool.connect((err, client, done) => {
    const query =
      "UPDATE gifs SET gif_comment = $1, created_date =$2  WHERE id=$3 RETURNING *";
    const values = [comment, thisTime, Id];
    client.query(query, values, (error, result) => {
      done();
      if (error) {
        res.status(400).json({ error });
        return;
      }

      res.status(202).send({
        status: "success",
        data: {
          message: "Comment successfully created",
          createdOn: thisTime,
          gifTitle: result.rows[0].title,
          article: result.rows[0].article,
          comment: result.rows[0].gif_comment
        }
      });
    });
  });
});


app.get("/feed", function(req, res, next) { 

  pool.connect((err, client, done) => {
    if (err) {
      console.log("not able to get connection " + err);
      res.status(400).send(err);
    }
    const query = "SELECT id, title, article, created_date FROM articles "
    //const value = [thisTime.start, thisTime.end]
    client.query(query,  (err, result) => {
      
      done();
      if (err) {
        res.status(400).send(err);
      }
      res.status(200).send({
          status:"success",
           data:[
             {
            id:result.rows[0].id,
            createdOn: result.rows[0].created_date,
            title:result.rows[0].title,
            article:result.rows[0].article, //use article for articles
            authorId:result.rows[0].id
           }, 
           {  
            id:result.rows[1].id,
            createdOn: result.rows[1].created_date,
            title:result.rows[1].title,
            article: result.rows[1].article, //use article for articles
            authorId:result.rows[1].id
           },
           {
            id:result.rows[2].id,
            createdOn: result.rows[2].created_date,
            title:result.rows[2].title,
            article: result.rows[2].article, //use url for gif post and article for articles
            url : result.rows[2].url,
            authorId:result.rows[2].id
           }
          ]  
         
        });
    });
  });
});

app.get("/articles/:articlesId", function(req, res, next) {
  let Id = parseInt(req.params.articlesId)
  let thisTime = {
    start:'2019-11-24',
    end:'2019-11-29'
  }
  
  pool.connect((err, client, done) => {
    if (err) {
      console.log("not able to get connection " + err);
      res.status(400).send(err);
    }
    const query = "SELECT * FROM articles where id = $1 AND created_date between $2 AND $3"
    const value = [Id, thisTime.start, thisTime.end]
    client.query(query, value, (err, result) => {
      
      done();
      if (err) {
        res.status(400).send(err);
      }
      res.status(200).send({
          status:"success",
           data:{
              articleId:result.rows[0].id,
               createdOn:result.rows[0].created_date,
               title:result.rows[0].title,
               article:result.rows[0].article,
           },   
        comments:[
          {
             commentId:result.rows[0].id,
             comment:result.rows[0].comment,
             authorId:result.rows[0].id
          },
          {
            commentId:result.rows[0].id,
            comment:result.rows[0].comment,
            authorId:result.rows[0].id
          }
        ]
               
        });
    });
  });
});


    



app.get("/gifs/:gifId", function(req, res, next) {
  let Id = parseInt(req.params.gifId)
  let thisTime = {
    start:'2019-11-24',
    end:'2019-11-29'
  }
  
  pool.connect((err, client, done) => {
    if (err) {
      console.log("not able to get connection " + err);
      res.status(400).send(err);
    }
    const query = "SELECT * FROM gifs where id = $1 AND created_date between $2 AND $3"
    const value = [Id, thisTime.start, thisTime.end]
    client.query(query, value, (err, result) => {
      
      done();
      if (err) {
        res.status(400).send(err);
      }
      res.status(200).send({
          status:"success",
           data:{
              articleId:result.rows[0].id,
               createdOn:result.rows[0].created_date,
               title:result.rows[0].title,
              
           },   
        comments:[
          {
             commentId:result.rows[0].id,
             authorId:result.rows[0].id,
             comment:result.rows[0].gif_comment,
          },
          {
            
          }
        ]
               
        });
    });
  });
});


module.exports = app;
