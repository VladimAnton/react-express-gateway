const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    receivers: [{ type:Types.ObjectId, ref: 'Receiver' }]
})

module.exports = model('User', schema)