const mongoose = require('mongoose');
const {Schema} = mongoose;

const registerFormat = new Schema ({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('registerFormat', registerFormat);