require('dotenv').config()

const config = process.env

module.exports = {
    mongoConfig: {
        connectionUrl:config.MONGO_CONNECTION_URL,
        database:"iibtproject_db",
        collections:{
            USERS:"users",
            PROPERTIES:"properties"
        }
    },
    serverConfig: {
        ip: config.SERVER_IP,
        port: config.PORT
    },
    tokenSecret: config.TOKEN_SECRET
}