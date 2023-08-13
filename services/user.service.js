const {mongoConfig} = require('../config')
const MongoDB = require("./mongodb.service")

const getUserData = async (username) => {
    try {
        let userObject = await MongoDB.db
        .collection(mongoConfig.collections.USERS)
        .findOne({username})

        if(userObject){
            return {
                status: true,
                message: "User found successfully",
                data: userObject
            }
        } else{
            return{
                status: false,
                message: "No user found",
            }
        }
    } catch (error) {
        console.log("Error from backend", error)
        return{
            status: false,
            message: "failed to find user",
            error: `User finding failed: ${error.message}`,

        }
    }
}

module.exports = {getUserData}