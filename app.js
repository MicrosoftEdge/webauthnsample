const express = require("express");
const app = express();
const fido = require('./fido.js');
const bodyParser = require('body-parser');
const enforce = require('express-sslify');

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
        const challenge = await fido.getChallenge();
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
        const credential = await fido.makeCredential(req.body);
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
        const credential = await fido.verifyAssertion(req.body);
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
