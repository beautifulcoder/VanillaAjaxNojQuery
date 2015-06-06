var express = require('express'),
    router = express.Router();

router.get('/', function (req, res) {
    if (req.xhr && req.headers['x-vanillaajaxwithoutjquery-version'] === '1.0') {
        res.json({message: 'Hello World!'});
    } else {
        res.render('index', {title: 'Vanilla Ajax without jQuery'});
    }
});

module.exports = router;
