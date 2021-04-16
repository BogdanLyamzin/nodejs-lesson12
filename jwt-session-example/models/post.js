const {model} = require("mongoose");

const {postSchema} = require("./schemas");

const Post = model("post", postSchema);

module.exports = Post;