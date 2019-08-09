
// https://zeit.co/docs/v2/network/directory-listing/

module.exports =  (req, res) => {
    return res.json({accepting_webhooks: true})
}