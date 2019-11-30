const mongoose = require('mongoose');
const gifSchema = mongoose.Schema({
        token:{ type: String, required: true },
        title:{ type: String, required: true },
       image:{ type: image/gif, required: true },        
});
module.exports = mongoose.model('Gif', gifSchema)