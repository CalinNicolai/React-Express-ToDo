const {Schema, model} = require('mongoose');

const categoryValues = ['Sport', 'IT', 'Housework', 'Shopping', 'Health', 'Education', 'Travel', 'Entertainment', 'Other'];

const taskSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    creationDate: { type: Date, default: Date.now },
    deadline: { type: Date, required: true },
    category: { type: String, enum: categoryValues, required: true },
    userId: {type: Schema.Types.ObjectId, ref: 'User', required: true}
});


module.exports = model('Task', taskSchema)