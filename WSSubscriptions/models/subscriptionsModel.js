const mongoose = require('mongoose');

let SubscriptionSchema = new mongoose.Schema({
    MemberId : String,
    Movies: [{movieId : String, date : String}]
    
    /*
    phone : { home : String, mobile : String},
    Colors : [String]
    */
})

module.exports = mongoose.model('subscriptions',SubscriptionSchema);