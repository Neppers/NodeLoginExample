var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    local: {
        email: String,
        password: String
    },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);