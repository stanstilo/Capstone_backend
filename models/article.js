const mongoose = require('mongoose');
const articleSchema = mongoose.Schema({
        token:{ type: String, required: true },
        title:{ type: String, required: true },
       article:{ type: String, required: true },        
});
module.exports = mongoose.model('Article', articleSchema)