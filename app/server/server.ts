/// <reference path="../../typings/node/node.d.ts" />

let express = require('express');
let bodyParser = require('body-parser');
let _ = require('lodash');

let appServer = express();

let todos = [{id: 0, Description: 'server',Completed: false}];

appServer.use(express.static('.'));
appServer.use(bodyParser.json());
appServer.use(bodyParser.text());
appServer.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

appServer.route('/api/todo')
    .get((req, res) => {
        console.log(JSON.stringify(todos));
        res.send(todos);
    })
    .put((req, res) => {
        let json = req.body;
        let toggled = _.find(todos, (todo) => todo.id == json.id);
        toggled.completed = !toggled.completed;
        console.log(JSON.stringify(todos));
        res.send();
    })
    .delete((req,res) => {
        console.log('removing todo with id = ' + req.query.id);
        todos = _.remove(todos,(todo) => todo.id != req.query.id );
        console.log(JSON.stringify(todos));
        res.send();
    })
    .post((req, res) => {
        let maxId =  _.max(todos, (todo) => todo.id);
        if (maxId < 0) {
            maxId = 0;
        }
        let todo = req.body;
        todo.id = maxId + 1;
        todos.push(todo);
        console.log(JSON.stringify(todos));
        setTimeout(() => res.send(todo), 500);
    });

let server = appServer.listen(8080, function() {
    console.log("Server running at http://localhost:" + server.address().port);
});