const {Schema, model} = require('mongoose');
const stream = require("stream");

const TokenSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    refreshToken: { type: String, required: true},
})

module.exports = model('Token', TokenSchema)