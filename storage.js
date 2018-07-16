const mongoose = require('mongoose');

var mongodb_url = process.env.MONGODB_URL || 'mongodb://localhost:27017/fido';
mongoose.connect(mongodb_url);

var storage = {};

storage.Credentials = mongoose.model('Credential', new mongoose.Schema({
    id: {type: String, index: true},
    publicKeyJwk: Object,
    signCount: Number
}));

module.exports = storage;
