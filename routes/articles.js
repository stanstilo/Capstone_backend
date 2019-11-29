const express = require('express');
const router = express.Router()
const pool = require('../services/connection')

const articlesCtrl = require('../controllers/articles')

router.get("/", articlesCtrl.getArticles);
router.post("/", articlesCtrl.postArticles)
router.post("/:articleId/comment", articlesCtrl.postOneComment );
router.delete("/:articleId", articlesCtrl.deleteOneArticle);
router.get("/:articlesId", articlesCtrl.getOneArticle);
router.patch("/:articleId", articlesCtrl.updateOneArticle);
      

  module.exports = router