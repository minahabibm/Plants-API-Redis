const axios = require("axios");
const cache = require('../middlewares/redis');

exports.searchPlants = async (req, res) => {
    try {
        const keyWord = req.query.q; //Shasta Daisy
        const response = await axios.get('https://trefle.io/api/v1/plants/search?token=7lkQ2KkJjArFDJ-QguJDYXefdV-RZRWFW_gUy0sqta4&q='+ keyWord);
        const data = await JSON.stringify(response.data);
        req.session.freqSearchedcWords[keyWord] = data;
        res.status(200).send({
            searchResults: JSON.parse(data),
        });
        console.log("* GET Request @ /search/plants " + keyWord)
    } catch(err) {
        res.status(500).send({message: err.message});
    }
}
