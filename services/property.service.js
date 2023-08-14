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

const uploadProperties = async (property) => {
    try {
        if(!property?.name||
            !property?.address||
            !property?.image||
            !property?.location||
            !property?.price||
            !property?.rent){
            return {
                status: false,
                message:"Please fill all the details"
            }
        }
        const imageUploadResult = await uploadImage(property.image);
        let propertyObject = {
            name:property.name,
            address:property.address,
            image:imageUploadResult.data,
            location:property.location,
            price:property.price,
            rent:property.rent
        }
        let savedProperty = await MongoDB.db
            .collection(mongoConfig.collections.PROPERTIES)
            .insertOne(propertyObject)
            if(savedProperty?.acknowledged && savedProperty.insertedId){
                return {
                    status: true,
                    message:"Property added successfully"
                }
            } else {
                return {
                    status: false,
                    message:"Failed to add the property",
                    
                }
            }
    } catch (error) {
        return{
            status: false,
            message:error
        }
    }
   
}
module.exports = {getAllProperties, uploadProperties}