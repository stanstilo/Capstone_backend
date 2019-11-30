const mongoose = require('mongoose');
const feedSchema = mongoose.Schema({
    id : Integer,
    createdOn : DateTime,
    title : String,
    url : String, //use url for gif post and article for articles
    
    authorId: Integer ,       
});
module.exports = mongoose.model('Feed', feedSchema)