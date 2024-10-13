const mongoose = require('mongoose');

//TODO - Create Note Schema here having fields
//      - noteTitle
//      - noteDescription
//      - priority (Value can be HIGH, LOW or MEDUIM)
//      - dateAdded
//      - dateUpdated

const { Schema } = mongoose;

const noteSchema = new Schema({

    noteTitle: {
        type: String,
        required: true,
    },
    noteDescription: {
        type: String,
        required: true,
    },
    priority: {
        type: String,
        enum: ['HIGH', 'MEDIUM', 'LOW'],
        required: true,
    },
    dateAdded: {
        type: Date,
        default: Date.now
    },
    dateUpdated: {
        type: Date,
        default: Date.now
    }
});

const Note = mongoose.model('Note', noteSchema)

module.exports = Note;