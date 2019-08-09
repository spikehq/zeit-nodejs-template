
module.exports = (req, res) => {
    console.log(req.url)
    console.log(req.params)
    console.log(req.query)
    return res.json({name: 'asd'})
}
