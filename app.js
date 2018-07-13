var express = require("express");
var app = express();
var fido = require('./fido.js');
var bodyParser = require('body-parser');
var enforce = require('express-sslify');

if (process.env.ENFORCE_SSL_HEROKU === "true") {
    app.use(enforce.HTTPS({ trustProtoHeader: true }));
} else if (process.env.ENFORCE_SSL_AZURE === "true") {
    app.use(enforce.HTTPS({ trustAzureHeader: true }));
}
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/challenge', async (req, res) => {
    try {
        var challenge = await fido.getChallenge();
        res.json({
            result: challenge
        });
    } catch (e) {
        res.json({
            error: e.message
        });
    };
});

app.put('/credentials', async (req, res) => {
    try {
        var credential = await fido.makeCredential(req.body);
        res.json({
            result: credential
        });
    } catch (e) {
        res.json({
            error: e.message
        });
    }
});

app.put('/assertion', async (req, res) => {
    try {
        var credential = await fido.verifyAssertion(req.body);
        res.json({
            result: credential
        });
    } catch (e) {
        res.json({
            error: e.message
        });
    }
});

app.listen(process.env.PORT || 3000, () => console.log('App launched.'));
