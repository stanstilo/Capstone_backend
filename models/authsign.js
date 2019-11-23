const mongoose = require('mongoose');
const authsignSchema = mongoose.Schema({
        email:{ type: String, required: true },
        password:{ type: String, required: true },       
});
module.exports = mongoose.model('AuthCreate', authsignSchema)