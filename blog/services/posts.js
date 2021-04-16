const {Post} = require("../models");

const getAllPosts = (query) {
    Post.find({});
    /*
    Post.find({}, "name", {skip: 10, limit: 5}, (err, data)=>{

    })
    */
    /*
    const request = Post.find({}).skip(10).limit(5);
    request.exec((err, data)=>{

    })
    */
};

module.exports = {
    getAllPosts
}