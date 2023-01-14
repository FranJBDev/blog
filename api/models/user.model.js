const mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  user: String,
  pass: String,
});

module.exports = mongoose.model('user', userSchema);

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
