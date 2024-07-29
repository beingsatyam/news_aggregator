const express = require('express');
const  { validateUser } = require("../middlewares/validate.middleware")
const router  = express.Router();

const { getNews , fetchNewsByID, markAsRead ,getReadNews ,markAsFavorite , getFavoriteNews } = require("../controllers/news.controller");


router.get('/read' , validateUser , getReadNews);

router.get('/favorites' , validateUser , getFavoriteNews);

router.get('/' , validateUser , getNews);

router.post('/:id/read' ,validateUser , markAsRead);


router.post('/:id/favorite' ,validateUser , markAsFavorite);

router.get('/:id' , validateUser , fetchNewsByID);


module.exports = router;