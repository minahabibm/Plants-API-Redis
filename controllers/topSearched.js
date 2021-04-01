const axios = require("axios");
const cache = require('../middlewares/redis');

exports.getAllPlants = async (req, res) => {
    try {
        const cachedKeyWord = req._parsedUrl.path;
        const response = await axios.get('https://trefle.io/api/v1/plants?token=7lkQ2KkJjArFDJ-QguJDYXefdV-RZRWFW_gUy0sqta4');
        const data = await JSON.stringify(response.data);

        cache.redisClient.setex(cachedKeyWord, 3600, data);
        res.status(200).send({
            allPlants: JSON.parse(data),
        });
        console.log("* GET Request @ /topSearched/allPlants")
    } catch(err) {
        res.status(500).send({message: err.message});
    }
}

exports.getAllSpecies = async (req, res) => {
    try {
        const cachedKeyWord = req._parsedUrl.path;
        const response = await axios.get('https://trefle.io/api/v1/species?token=7lkQ2KkJjArFDJ-QguJDYXefdV-RZRWFW_gUy0sqta4');
        const data = await JSON.stringify(response.data);

        cache.redisClient.setex(cachedKeyWord, 3600, data);
        res.status(200).send({
            allSpecies: JSON.parse(data),
        });	
        console.log("* GET Request @ /topSearched/allSpecies")
    } catch(err) {
        res.status(500).send({message: err.message});
    }
}

exports.getEdiblePlants = async (req, res) => {
    try {
        const cachedKeyWord = req._parsedUrl.path;
        const response = await axios.get('https://trefle.io/api/v1/plants?filter_not%5Bedible_part%5D=null&token=7lkQ2KkJjArFDJ-QguJDYXefdV-RZRWFW_gUy0sqta4');
        const data = await JSON.stringify(response.data);

        cache.redisClient.setex(cachedKeyWord, 3600, data);
        res.status(200).send({
            ediblePlants: JSON.parse(data),
        });	
        console.log("* GET Request @ /topSearched/ediblePlants")
    } catch(err) {
        res.status(500).send({message: err.message});
    }
}

exports.getTallestTrees = async (req, res) => {
    try {
        const cachedKeyWord = req._parsedUrl.path;
        const response = await axios.get('https://trefle.io/api/v1/plants?filter_not%5Bmaximum_height_cm%5D=null&filter%5Bligneous_type%5D=tree&order%5Bmaximum_height_cm%5D=desc&token=7lkQ2KkJjArFDJ-QguJDYXefdV-RZRWFW_gUy0sqta4');
        const data = await JSON.stringify(response.data);

        cache.redisClient.setex(cachedKeyWord, 3600, data);
        res.status(200).send({
            tallestTrees: JSON.parse(data),
        });	
        console.log("* GET Request @ /topSearched/tallestTrees")
    } catch(err) {
        res.status(500).send({message: err.message});
    }
}

exports.getRedFlowers = async (req, res) => {
    try {
        const cachedKeyWord = req._parsedUrl.path;
        const response = await axios.get('https://trefle.io/api/v1/species?filter%5Bflower_color%5D=red&token=7lkQ2KkJjArFDJ-QguJDYXefdV-RZRWFW_gUy0sqta4');
        const data = await JSON.stringify(response.data);

        cache.redisClient.setex(cachedKeyWord, 3600, data);
        res.status(200).send({
            plantsInAntartica: JSON.parse(data),
        });	
        console.log("* GET Request @ /topSearched/redFlowers")
    } catch(err) {
        res.status(500).send({message: err.message});
    }
}