
/**
 * Production config
 */

module.exports = {

    // db uri to connect. Name of the database is notifications, please change it to your liking
    mongodb: {
        uri: '',
        options : {
            useNewUrlParser: true,
            useCreateIndex: true,
            reconnectInterval: 1000,
            reconnectTries: Number.MAX_VALUE,
            user: '',
            pass: process.env.db_password,
            authSource: 'admin'
        }
    }
};
