const {Schema, model} = require('mongoose');
const stream = require("stream");

const UserSchema = new Schema({
    email: { type: String, unique: true, required: true},
    password: { type: String, required: true},
    isActivated: { type: Boolean, default: false},
    activationLink: { type: String},
})

module.exports = model('User', UserSchema)