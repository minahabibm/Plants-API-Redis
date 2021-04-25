const express = require("express");
const session = require('express-session');
const dotenv = require('dotenv');
dotenv.config();

const routes = require('./routes/index');
const redis = require('./middlewares/redis');
const PORT = process.env.PORT || 7000;

const app = express();
redis.redisSetup();

app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(session({
    secret: 'ThisIsHowYouUseRedisSessionStorage',
    name: '_redisPractice',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Note that the cookie-parser module is no longer needed
    store: redis.redisStore,
}));
app.get('/', (req, res) => {
  res.send('Hello World!');
  console.log("* GET Request @ /")
})
app.use('/', routes);

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`)
})