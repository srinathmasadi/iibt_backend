const MongoDB = require("./mongodb.service")
const { mongoConfig } = require("../config")
const { ObjectId } = require('mongodb');

const getAllProperties = async () => {
    try {
        let properties = await MongoDB.db
        .collection(mongoConfig.collections.PROPERTIES)
        .find()
        .sort({ createdAt: -1 })
        .toArray()

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
            !property?.rent||
            !property.username){
            return {
                status: false,
                message:"Please fill all the details"
            }
        }
        let propertyObject = {
            name:property.name,
            address:property.address,
            image:property.image,
            location:property.location,
            price:property.price,
            rent:property.rent,
            username:property.username
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

const getUserProperties = async (username) => {
    try {
        const userProperties = await MongoDB.db
            .collection(mongoConfig.collections.PROPERTIES)
            .find({ username })
            .toArray();
        
        return {
            status: true,
            properties: userProperties,
        };
    } catch (error) {
        return {
            status: false,
            message: error,
        };
    }
};

const updateUserPropertiesById = async (propertyId, newProperties) => {
    // console.log(propertyId, newProperties)
    try {
        // Update user properties in the MongoDB collection based on the _id field
        const updateResult = await MongoDB.db
            .collection(mongoConfig.collections.PROPERTIES)
            .updateOne({ _id: new ObjectId(propertyId) }, { $set: newProperties });
        
        if (updateResult.modifiedCount === 1) {
            return {
                status: true,
                message: "Property details updated successfully.",
            };
        } else {
            return {
                status: false,
                message: "Property details could not be updated.",
            };
        }
    } catch (error) {
        return {
            status: false,
            message: error.toString(), // Convert the error to a string for response
        };
    }
};
module.exports = {getAllProperties, uploadProperties, getUserProperties, updateUserPropertiesById}