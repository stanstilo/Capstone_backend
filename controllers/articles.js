const pool = require('../services/connection');

exports.getArticles = (req, res) => {
  pool.connect((err, client, done) => {
    if (err) {
      res.status(400).send(`not able to get connection ${err}`);
    }
    client.query('SELECT * FROM articles ORDER BY id DESC', (result) => {
      done();
      if (err) {
        res.status(400).send(err);
      }
      res.status(200).send(result.rows);
    });
  });
};

exports.postArticles = (req, res) => {
  const thisTime = new Date();
  const userData = {
    article: req.body.article,
    title: req.body.title,
  };
  pool.connect((err, client, done) => {
    const query = 'INSERT INTO articles(article, title, created_date) VALUES($1,$2, $3) RETURNING *';
    const values = [userData.article, userData.title, thisTime];
    client.query(query, values, (error, result) => {
      done();
      if (error) {
        res.status(400).json({ error });
      }
      res.status(202).send({
        status: 'success',
        data: {
          message: 'Article successfully posted',
          createdOn: thisTime,
          articleId: result.rows[0].id,
          title: result.rows[0].title,

        },
      });
    });
  });
};

exports.postOneComment = (req, res) => {
  const Id = parseInt(req.params.articleId, 10);
  const thisTime = new Date();
  const { comment } = req.body;
  pool.connect((err, client, done) => {
    const query = 'UPDATE articles SET comment = $1, created_date =$2  WHERE id=$3 RETURNING *';
    const values = [comment, thisTime, Id];
    client.query(query, values, (error, result) => {
      done();
      if (error) {
        res.status(400).json({ error });
        return;
      }

      res.status(202).send({
        status: 'success',
        data: {
          message: 'Comment successfully created',
          createdOn: thisTime,
          articleTitle: result.rows[0].title,
          article: result.rows[0].article,
          comment: result.rows[0].comment,
        },
      });
    });
  });
};

exports.deleteOneArticle = (req, res) => {
  const Id = parseInt(req.params.articleId, 10);

  pool.connect((err, client, done) => {
    const query = 'delete from articles where id = $1';
    const values = [Id];
    client.query(query, values, (error) => {
      done();
      if (error) {
        res.status(400).json({ error });
      }
      res.status(202).send({
        status: 'Successful',
        data: {
          message: `Article with id ${Id} was deleted successfully`,
        },
      });
    });
  });
};

exports.getOneArticle = (req, res) => {
  const Id = parseInt(req.params.articlesId, 10);
  const thisTime = {
    start: '2019-11-24',
    end: '2019-11-29',
  };

  pool.connect((err, client, done) => {
    if (err) {
      res.status(400).send(`not able to get connection ${err}`);
    }
    const query = 'SELECT * FROM articles where id = $1 AND created_date between $2 AND $3';
    const value = [Id, thisTime.start, thisTime.end];
    client.query(query, value, (result) => {
      done();
      if (err) {
        res.status(400).send(err);
      }
      res.status(200).send({
        status: 'success',
        data: {
          articleId: result.rows[0].id,
          createdOn: result.rows[0].created_date,
          title: result.rows[0].title,
          article: result.rows[0].article,
        },
        comments: [
          {
            commentId: result.rows[0].id,
            comment: result.rows[0].comment,
            authorId: result.rows[0].id,
          },
          {
            commentId: result.rows[0].id,
            comment: result.rows[0].comment,
            authorId: result.rows[0].id,
          },
        ],

      });
    });
  });
};

exports.updateOneArticle = (req, res) => {
  const Id = parseInt(req.params.articleId, 10);
  const thisTime = new Date();
  const { title } = req.body;
  const { article } = req.body;
  pool.connect((err, client, done) => {
    const query = 'UPDATE articles SET title = $1, article = $2, created_date =$3 where id = $4 RETURNING *';
    const values = [title, article, thisTime, Id];
    client.query(query, values, (error, result) => {
      done();
      if (error) {
        res.status(400).json({ error });
        return;
      }
      res.status(202).send({
        status: 'success',
        data: {
          message: 'Comment successfully created',
          title: result.rows[0].title,
          article: result.rows[0].article,
        },
      });
    });
  });
};
