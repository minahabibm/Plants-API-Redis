const routes = require('express').Router();
const controllers = require('../controllers/auth');
const dummyUsers = require('../middlewares/dummyAuth');

routes.post('/login', dummyUsers.dummyUserAuthentication, controllers.authLogin);
routes.get('/logout', dummyUsers.dummyUserSessionDel, controllers.authLogout);

module.exports = routes;