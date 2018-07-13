const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/fido');

var storage = {};

storage.Credentials = mongoose.model('Credential', new mongoose.Schema({
    id: {type: String, index: true},
    publicKeyJwk: Object,
    signCount: Number,
    userName: String
}));

module.exports = storage;
