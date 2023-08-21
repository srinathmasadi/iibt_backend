const {MongoClient,ObjectId } = require("mongodb")
const {mongoConfig} = require('../config')

class MongoDB {
    static connectToMongoDB = () =>{
        MongoClient.connect(mongoConfig.connectionUrl, { useUnifiedTopology: true }).then(
            (connection)=>{
                console.log("Mongo Db Connected Successfully")
                this.db = connection.db(mongoConfig.database)
            }
        ).catch(error=>console.log(error))
    }
}

MongoDB.db=null

module.exports = MongoDB;