
// https://zeit.co/docs/v2/network/directory-listing/

const _ = require('lodash')
const chalk = require('chalk')

// This only fetches connection.
const db = require('../../models/db')

module.exports = async (req, res) => {
    ;(async () => {

        // Call the async function here and get the connection. If there is no connection already then it will create one.
        const dbConnection = await db()
        if (dbConnection) {
            const User = dbConnection.model('User')
            const Event = dbConnection.model('Event')
            const users = await User.countDocuments({})
            const users = await Event.countDocuments({})
            return res.json({users, events})
        } else {
            throw new Error('No DB connection established')
        }
    })()
}