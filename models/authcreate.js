const mongoose = require('mongoose');

const authcreateSchema = mongoose.Schema({
    
        firstName:{ type: String, required: true },
        lastName : { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        gender: { type: String, required: true },
        jobRole:{ type: String, required: true },
        department: { type: String, required: true },
        address: { type: String, required: true },
        email:{ type: String, required: true },
        password:{ type: String, required: true },       
});
module.exports = mongoose.model('AuthCreate', authcreateSchema)