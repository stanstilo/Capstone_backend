const pool = require('../services/connection');


exports.postGif = (req, res) => {
  const thisTime = new Date();
  req.body.thing = JSON.parse(req.body.thing);
  const url = `${req.protocol}://${req.get('host')}`;
  const userData = {
    image: `${url}/images/${req.file.filename}`,
    title: req.body.thing.title,
  };
  pool.connect((err, client, done) => {
    const query = 'INSERT INTO gifs(title, url,created_date) Values($1,$2,$3)RETURNING *';
    const values = [userData.image, userData.title, thisTime];
    client.query(query, values, (error, result) => {
      done();
      if (error) {
        res.status(400).json({ error });
      }
      res.status(202).send({
        status: 'success',
        data: {
          gifId: result.rows[0].id,
          message: 'Gif image successfully posted',
          createdOn: thisTime,
          imageUrl: result.rows[0].url,
          title: result.rows[0].title,
        },
      });
    });
  });
};

exports.deleteGif = (req, res) => {
  const Id = parseInt(req.params.gifId, 10);

  pool.connect((err, client, done) => {
    const query = 'delete from gifs where id = $1';
    const values = [Id];
    client.query(query, values, (error) => {
      done();
      if (error) {
        res.status(400).json({ error });
      }
      res.status(202).send({
        status: 'success',
        data: {
          message: `gif post with id ${Id} was deleted successfully`,
        },
      });
    });
  });
};

exports.postOneComment = (req, res) => {
  const Id = parseInt(req.params.gifId, 10);
  const thisTime = new Date();
  const { comment } = req.body;
  pool.connect((err, client, done) => {
    const query = 'UPDATE gifs SET gif_comment = $1, created_date =$2  WHERE id=$3 RETURNING *';
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
          gifTitle: result.rows[0].title,
          article: result.rows[0].article,
          comment: result.rows[0].gif_comment,
        },
      });
    });
  });
};

exports.getGif = (req, res) => {
  const Id = parseInt(req.params.gifId, 10);
  const thisTime = {
    start: '2019-11-24',
    end: '2019-11-29',
  };

  pool.connect((err, client, done) => {
    if (err) {
      res.status(400).send(`not able to get connection ${err}`);
    }
    const query = 'SELECT * FROM gifs where id = $1 AND created_date between $2 AND $3';
    const value = [Id, thisTime.start, thisTime.end];
    // eslint-disable-next-line no-shadow
    client.query(query, value, (err, result) => {
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

        },
        comments: [
          {
            commentId: result.rows[0].id,
            authorId: result.rows[0].id,
            comment: result.rows[0].gif_comment,
          },
          {

          },
        ],
      });
    });
  });
};
