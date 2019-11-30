const pool = require('../services/connection');

exports.getFeed = (req, res) => {
  pool.connect((err, client, done) => {
    if (err) {
      res.status(400).send(`not able to get connection${err}`);
    }
    const query = 'SELECT id, title, article, created_date FROM articles';
    // const value = [thisTime.start, thisTime.end]
    client.query(query, (result) => {
      done();
      if (err) {
        res.status(400).send(err);
      }
      res.status(200).send({
        status: 'success',
        data: [
          {
            id: result.rows[0].id,
            createdOn: result.rows[0].created_date,
            title: result.rows[0].title,
            article: result.rows[0].article, // use article for articles
            authorId: result.rows[0].id,
          },
          {
            id: result.rows[1].id,
            createdOn: result.rows[1].created_date,
            title: result.rows[1].title,
            article: result.rows[1].article, // use article for articles
            authorId: result.rows[1].id,
          },
          {
            id: result.rows[2].id,
            createdOn: result.rows[2].created_date,
            title: result.rows[2].title,
            article: result.rows[2].article, // use url for gif post and article for articles
            url: result.rows[2].url,
            authorId: result.rows[2].id,
          },
        ],
      });
    });
  });
};
