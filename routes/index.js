const routes = require('express').Router();

const login = require('./auth')
const search = require('./search');
const topSearched = require('./topSearched');

routes.use('/', login);
routes.use('/search', search);
routes.use('/topSearched', topSearched);

module.exports = routes;