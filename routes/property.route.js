var express = require("express");
const {getAllProperties} = require('../services/property.service')
var router = express.Router();

router.get("/", async (req, res)=> {
    let response = await getAllProperties();
    res.json(response);
})

module.exports = router;