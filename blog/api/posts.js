const express = require("express");

const {postsCtrl} = require("../controllers");

const router = express.Router();

router.get("/", postsCtrl.getAll);

module.exports = router;