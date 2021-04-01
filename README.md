# redis - cache & session 

This is a plants App API; a tutorial for express and redis. Used to Search and Obtain data about plants from trefle API.

The API will will create GET and POST Endpoints, to connect, login to the plants API and Fetch data from trefle API. Next, cache the results for common searches in redis cache or for specified searches, you will need to login to search and redis would create a session, and cache your searched phrases in session store per session.  

## Technology Stack
* Node.JS
* npm
* express
* redis
* axios

## Initial Setup
* Clone the repository.
* Install redis or use the docker build.
    
### Build and install
Ensure you have: Node.JS, npm, redis.

* Confirm redis is running `redis-cli ping` .
* `npm i`
* `npm start`

### Build using Docker (Recommended)
* `docker-compose up`

### Common Endpoints
you can use Postman, curl...etc
* `http://localhost:7000`
* `http://localhost:7000/topSearched/tallestTrees`
* `http://localhost:7000/login` Include in the body of the request email=John.Doe@gmail.com and password=s3cr3tp4sswo4rd(x-www-form-urlencoded)
* `http://localhost:7000/logout`
* `http://localhost:7000/search/plants?q=Shasta+Daisy`