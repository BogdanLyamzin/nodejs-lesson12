const {postsService: service} = require("../services");

const getAll = async (req, res, next) => {
    const {query} = req;
    try {
        const results = await service.getAllPosts(query);
        res.json({
            status: "success",
            code: 200,
            data: {
                results
            }
        })
    }
    catch (error){
        next(error);
    }
}

module.exports = {
    getAll
}