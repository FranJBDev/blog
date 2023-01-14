const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  userId: String,
  post: String,
  reaction: String,
});

module.exports = mongoose.model('post', postSchema);

/* mongoose types

    String
    Number
    Date
    Buffer
    Boolean
    Mixed
    ObjectId
    Array
    Decimal128
    Map
    Schema
*/
