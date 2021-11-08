
const mongoose = require('mongoose');

let MovieSchema = new mongoose.Schema({
    Name : String,
    Genres : [String],
    Image: String,
    Premiered : String
    /*
    phone : { home : String, mobile : String},
    Colors : [String]
    */
})

module.exports = mongoose.model('movies',MovieSchema);