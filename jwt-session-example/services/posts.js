const {Post} = require("../models");

const getAllPosts = (query) {
    return Post.find({});
};

module.exports = {
    getAllPosts
}