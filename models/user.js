/**
 * User data
 */

const mongoose = require('mongoose')
  , Schema     = mongoose.Schema

const UserSchema = new Schema({
    email:               { type: String, required: true, index: {unique: true }},
    hash:                { type: String, select: false },
    firstName:           { type: String, default: null },
    lastName:            { type: String, default: null },
    orgName:             { type: String, default: null },
    emailNotifications:  { type: Boolean, default: true },
    isConfirmed:         { type: Boolean, default: false },
    confirmationToken:   { type: String, default: null },
    resetPasswordToken:  { type: String, default: null },
    resetTokenCreatedAt: { type: Date, default: null },

    loginCount: { type: Number, default: 0 },
    logins:     [],

}, {
    timestamps: true
})

module.exports = (conn) => {
  conn.model('User', UserSchema);
}