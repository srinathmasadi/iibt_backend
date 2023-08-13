const MongoDB = require("./mongodb.service")
const { mongoConfig } = require("../config")

const getAllProperties = async () => {
    try {
        let properties = await MongoDB.db
        .collection(mongoConfig.collections.PROPERTIES)
        .find().toArray()

        if(properties && properties?.length > 0){
            return {
                status: true,
                message: "Properties found successfully",
                data: properties,
            }
        } else{
            return{
                status: false,
                message: "No property found",
            }
        }
    } catch (error) {
        console.log("Error in backend restraunt", error)
        return{
            status: false,
            message: "failed to find properties",
            error: `Property finding failed: ${error.message}`,

        }
    }
};
module.exports = {getAllProperties}