var express = require("express");
const {uploadImage} = require('../services/photoUpload.service')
var router = express.Router();

router.post("/uploadImage", async(req,res)=>{
    const image = req?.body?.image
    let response = await uploadImage(image)
    res.json(response);
})
module.exports = router;