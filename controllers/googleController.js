const db = require("../models");
const axios = require("axios");

// google api call
module.exports = {
    getBook: function (req, res) {
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=title:${req.title}`)
            .then(data => {
                res.json(data.data);
            })
            .catch(err => console.log(err))
    },

};