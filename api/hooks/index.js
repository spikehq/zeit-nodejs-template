
// https://zeit.co/docs/v2/network/directory-listing/

const _ = require('lodash')
const chalk = require('chalk')

// This only fetches connection.
const db = require('../../models/db')

module.exports = async (req, res) => {
    ;(async () => {
        console.log(req.query)
        console.log(req.method)
        console.log(req.body)

        // Call the async function here and get the connection. If there is no connection already then it will create one.
        const dbConnection = await db()
        if (dbConnection) {
            const Integration = dbConnection.model('Integration')
            const User = dbConnection.model('User')
            const Incident = dbConnection.model('Incident')
            const Org = dbConnection.model('Org')
            const Event = dbConnection.model('Event')
            const Escalation = dbConnection.model('Escalation')
            const integrations = await Integration.countDocuments({})
            const incidents = await Incident.countDocuments({})
            const orgs = await Org.countDocuments({})
            const users = await User.countDocuments({})
            const escalations = await Escalation.countDocuments({})
            return res.json({integrations, users, orgs, escalations, incidents})
        } else {
            throw new Error('No DB connection established')
        }
    })()
}