const express = require('express');

const router = express.Router();

// const auth = require('../middleware/auth');


const articlesCtrl = require('../controllers/articles');

router.get('/', articlesCtrl.getArticles);
router.post('/', articlesCtrl.postArticles);
router.post('/:articleId/comment', articlesCtrl.postOneComment);
router.delete('/:articleId', articlesCtrl.deleteOneArticle);
router.get('/:articlesId', articlesCtrl.getOneArticle);
router.patch('/:articleId', articlesCtrl.updateOneArticle);

module.exports = router;
