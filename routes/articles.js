const express = require('express');

const router = express.Router();

const auth = require('../middleware/auth');


const articlesCtrl = require('../controllers/articles');

router.get('/', auth, articlesCtrl.getArticles);
router.post('/', auth, articlesCtrl.postArticles);
router.post('/:articleId/comment', auth, articlesCtrl.postOneComment);
router.delete('/:articleId', auth, articlesCtrl.deleteOneArticle);
router.get('/:articlesId', auth, articlesCtrl.getOneArticle);
router.patch('/:articleId', auth, articlesCtrl.updateOneArticle);

module.exports = router;
