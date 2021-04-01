const routes = require('express').Router();
const controllers = require('../controllers/search');
const dummyUsers = require('../middlewares/dummyAuth');
const cache = require('../middlewares/redis');


routes.get(
    '/plants', 
    dummyUsers.requireAuthentication,
    cache.cacheSearchedWord, 
    controllers.searchPlants
);

module.exports = routes;