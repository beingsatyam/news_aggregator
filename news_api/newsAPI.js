const NEWS = require('../db/news.db');
const axios = require('axios');
const crypto = require('crypto');


const cache = {};
const CACHE_TTL = 3600 * 1000; 

const BASE_API_URL = 'https://newsapi.org/v2/'
const API_KEY = process.env.NEWS_API_KEY;


async function fetchNewsArticles(prefer) {
  try {

    const response = await axios.get(`${BASE_API_URL}everything?q=(${prefer})&apiKey=${API_KEY}`, {
      params: {
        apiKey: API_KEY
      }
    });
    if (response.data.status === 'ok') {
      let availableArticles = response.data.articles.filter((value) => value.source.id != null);

      let formattedOutput = [];

      for(article of availableArticles){

        const _id = crypto.createHash('md5').update(article.url).digest('hex'); //storing md5 hash of url as id
        
        // remove extra details
        formattedOutput.push(
            {   
                id : _id,
                author : article.author,
                title: article.title,
                url : article.url

            }
        );

        const availableNEWS = NEWS.filter(value => value.id == _id);

        console.log(availableNEWS);

        if (availableNEWS.length == 0) {

          NEWS.push(
              {   
                id : _id,
                author : article.author,
                title: article.title,
                url : article.url

            }
        );
        }
      }
      console.log(NEWS);



      return formattedOutput
    } else {
      throw new Error('Failed to fetch news articles');
    }
  } catch (error) {
    console.error('ERROR || ', error);
    throw error;
  }
};


async function getNewsArticles(prefer) {
  const cacheKey = prefer;
  const now = Date.now();

  console.log(cacheKey);

  if (cache[cacheKey] && (now - cache[cacheKey].timestamp < CACHE_TTL)) {
    console.log('cached articles');
    return cache[cacheKey].data;
  }

  console.log('Fetching articles from API');
  const articles = await fetchNewsArticles(prefer);

  cache[cacheKey] = {
    data: articles,
    timestamp: now
  };
  console.log(cache);


  return articles;
};



module.exports = getNewsArticles;