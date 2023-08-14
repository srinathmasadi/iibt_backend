var express = require("express");
const {getAllProperties,uploadProperties} = require('../services/property.service')
const {getUserData} = require('../services/user.service')
var router = express.Router();

router.get("/", async (req, res)=> {
    let response = await getAllProperties();
    res.json(response);
})

router.post("/addData", async(req,res)=>{
    let username = req?.username
    let userResponse = await getUserData(username)
    if (userResponse.status && userResponse.message === "User found successfully") {
        // Check if the user is an admin (assuming the isAdmin field exists in the userObject)
        if (userResponse.data && userResponse.data.isAdmin) {
            const body = req.body;
            const response = await uploadProperties(body);
            res.json(response);
        } else {
            res.json({
                status: false,
                message: "User is not an admin. Access denied."
            });
        }
    } else {
        res.json({
            status: false,
            message: "No user found."
        });
    }
})

module.exports = router;