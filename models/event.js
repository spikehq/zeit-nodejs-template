/**
 * Event data
 */

const mongoose = require('mongoose')
  , Schema     = mongoose.Schema

const EventSchema = new Schema({
    name       : { type: String },
    data       : {},
    metadata   : {},
    subject    : String,
    message    : String
}, {
    timestamps: true
})

module.exports = (conn) => {
  conn.model('Event', EventSchema);
}