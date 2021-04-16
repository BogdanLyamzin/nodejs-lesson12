const {Schema, ObjectId } = require("mongoose");

const postSchema = Schema({
    title: {
        type: String,
        required: [true, "Post must have a title"],
        maxlength: 2
    },
    content: {
        type: String,
        required: [true, "Post must have a content"],
        maxlength: 2
    },
    userId: {
        type: ObjectId,
        ref: "User",
        required: true
    }
});

module.exports = postSchema;