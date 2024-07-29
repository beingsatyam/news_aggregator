

const USERS = require("../db/users.db");
const NEWS = require("../db/news.db");
const USERS_NEWS_MAP = require("../db/users_news.db");
const getNewsArticles = require("../news_api/newsAPI")
const crypto = require("crypto");


async function getNews(req , res) {

    const userId = req.userId;

    const user = USERS.find((value) => value.id == userId);
    let prefer = user.preferences;

    prefer = prefer.join(' OR ')

    const articles = await getNewsArticles(prefer);

    res.json({
        "news" : articles
    });


};


async function markAsRead(req , res) {

    const userId = req.userId;

    const { id } = req.params;

    const user = USERS.find((value) => value.id == userId);

    console.log(USERS_NEWS_MAP);

    if (!(user.id in USERS_NEWS_MAP.read)) {
      USERS_NEWS_MAP.read[user.id] = [id];
    }
    else {
      USERS_NEWS_MAP.read[user.id].push(id)
    }

    console.log(USERS_NEWS_MAP);


    res.json({
        "message" : "marked as read!"
    });


};



async function markAsFavorite(req , res) {

  const userId = req.userId;

  const { id } = req.params;

  const user = USERS.find((value) => value.id == userId);

  if (!(user.id in USERS_NEWS_MAP.favorite)) {
    USERS_NEWS_MAP.favorite[user.id] = [id];
  }
  else {
    USERS_NEWS_MAP.favorite[user.id].push(id)
  }

  console.log(USERS_NEWS_MAP);


  res.json({
      "message" : "marked as favorite!"
  });


};


async function fetchNewsByID(req , res) {

  const { id } = req.params;

  const availableNEWS = NEWS.find((value) => value.id == id);
  
  res.json({
      "news" : availableNEWS
  });


};



async function getReadNews(req , res) {

  const username = req.username;

  const user = USERS.find((value) => value.username == username);
  let userId = user.id;

  let readArticleIDs = USERS_NEWS_MAP.read[userId];

  const readArticles = NEWS.filter(value =>  readArticleIDs.filter(x=>x==value.id).length>0)

  res.json({
      "news" : readArticles
  });


};


async function getFavoriteNews(req , res) {

  console.log("inside favorite")
  const username = req.username;


  const user = USERS.find((value) => value.username == username);
  let userId = user.id;

  let favArticleIDs = USERS_NEWS_MAP.favorite[userId] ? USERS_NEWS_MAP.favorite[userId] : [];



  const favArticles = NEWS.filter(value =>  favArticleIDs.filter(x=>x==value.id).length>0)

  console.log(favArticleIDs , favArticles);

  res.json({
      "news" : favArticles
  });


};


module.exports = { getNews , fetchNewsByID , markAsRead , getReadNews ,markAsFavorite ,getFavoriteNews};