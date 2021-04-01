const redis = require("redis");
var session = require('express-session');
const RedisStore = require('connect-redis')(session);

const REDIS_HOST = process.env.REDIS_HOST || '127.0.0.1';
const REDIS_PORT = process.env.REDIS_PORT || 6379;

redisClient = redis.createClient({
  host: REDIS_HOST,
  port: REDIS_PORT,
});
redisStore = new RedisStore({ 
    host: 'localhost', 
    port: REDIS_PORT, 
    client: redisClient, 
    ttl: 3600 
});

setup = () => {
    redisClient.on('connect', function(){
        console.log('Connected to Redis');
    });
    
    redisClient.on('error', function(err) {
         console.log('Redis error: ' + err);
    });
}

cacheTopSearched = async (req, res, next) => {
    const cachedKeyWord = req._parsedUrl.path;
    redisClient.get(cachedKeyWord, (error, cachedData) => {
      if (error) throw error;
      if (cachedData != null) {
        res.status(200).send({
            allPlants: JSON.parse(cachedData),
        });
        console.log("* GET Request @ /topSearched" + cachedKeyWord)
        console.log("* Fetching data From cache...");
      } else {
        next();
      }
    });
}

cacheSearchedWord = async (req, res, next) => {
  const cachedKeyWord = req._parsedUrl.path;
  const keyWord = req.query.q
  if ( keyWord in req.session.freqSearchedcWords) {
    res.status(200).send({
      searchResults: JSON.parse(req.session.freqSearchedcWords[keyWord]),
    });
    console.log("* GET Request @ /search/plants " + keyWord)
    console.log("* Fetching data From cache...");
  } else {
      next();
    }
}

getAllActiveSessions = () => {
  return new Promise((resolve, reject) => {
      redisStore.all(function(err, sessions) {
          if(err) reject(err);
          else resolve(sessions);
      });
  });
}

exports.redisClient = redisClient;
exports.redisStore = redisStore;
exports.redisSetup = setup;
exports.cacheTopSearched = cacheTopSearched;
exports.cacheSearchedWord = cacheSearchedWord;
exports.getAllActiveSessions = getAllActiveSessions;