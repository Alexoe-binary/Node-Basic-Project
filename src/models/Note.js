const mongoose = require('mongoose');

const {Schema} = mongoose;

// estrutura de la schema de notas
const NoteSchema = new Schema({
    title: {type: String, required: true},
    description_schema: {type: String, required: true},
    date: {type: Date, default: Date.now}
});

//guardar 
module.exports = mongoose.model('Note',NoteSchema);