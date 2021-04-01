const routes = require('express').Router();
const controllers = require('../controllers/topSearched');
const cache = require('../middlewares/redis');

routes.get('/allPlants', cache.cacheTopSearched, controllers.getAllPlants);
routes.get('/allSpecies', cache.cacheTopSearched, controllers.getAllSpecies);
routes.get('/ediblePlants', cache.cacheTopSearched, controllers.getEdiblePlants);
routes.get('/tallestTrees', cache.cacheTopSearched, controllers.getTallestTrees);
routes.get('/redFlowers', cache.cacheTopSearched, controllers.getRedFlowers);

module.exports = routes;