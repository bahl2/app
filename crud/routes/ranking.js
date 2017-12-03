var express = require('express');
var router = express.Router();

router.get('/list', function(req, res, next) {
    req.getConnection(function(err, connection) {
        var query = connection.query('SELECT * FROM ranking', function(err, rows) {
            if (err)
                console.log("Error Selecting : %s ", err);
            res.json({ data: rows });
        });
    });
});

router.get('/listranking', function(req, res, next) {
    var id = req.query.id;
    req.getConnection(function(err, connection) {
        var query = connection.query('SELECT * FROM ranking WHERE id = ? ', [id], function(err, rows) {
            if (err)
                console.log("Error Selecting : %s ", err);
            res.json({ data: rows });
        });
    });
});

router.post('/add', function(req, res, next) {
    var input = JSON.parse(JSON.stringify(req.body));
    req.getConnection(function(err, connection) {
        var data = {
            nome: input.nome,
            tempo: input.tempo,
            dementadores: input.dementadores,
            esqueletos: input.esqueletos
        };

        var query = connection.query("INSERT INTO ranking set ? ", data, function(err, rows) {
            if (err)
                console.log("Error inserting : %s ", err);
            res.redirect('/index.html');
        });
    });
});

router.post('/edit', function(req, res, next) {
    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.query.id;
    req.getConnection(function(err, connection) {
        var data = {
            nome: input.nome,
            tempo: input.tempo,
            dementadores: input.dementadores,
            esqueletos: input.esqueletos

        };
        connection.query("UPDATE ranking set ? WHERE id = ? ", [data, id], function(err, rows) {
            if (err)
                console.log("Error Updating : %s ", err);
            res.redirect('/index.html');
        });

    });
});

router.post('/delete', function(req, res, next) {
    var id = req.query.id;
    req.getConnection(function(err, connection) {
        connection.query("DELETE FROM ranking  WHERE id = ? ", [id], function(err, rows) {
            if (err)
                console.log("Error deleting : %s ", err);
            res.redirect('/index.html');
        });
    });
});

module.exports = router;