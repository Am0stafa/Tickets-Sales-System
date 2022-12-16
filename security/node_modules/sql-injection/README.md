[![Build Status](https://secure.travis-ci.org/ghafran/sql-injection.png)](http://travis-ci.org/ghafran/sql-injection)
[![NSP Status](https://nodesecurity.io/orgs/ghafran/projects/c6cb2b07-e84b-4985-84ca-ea057c88cadb/badge)](https://nodesecurity.io/orgs/ghafran/projects/c6cb2b07-e84b-4985-84ca-ea057c88cadb)

sql-injection
=============

This express module detects sql injection attacks and stops them by sending 403 as response.
The module checks the query string, route params, and body for any sql injection related content.

```js
var app = express();
var sqlinjection = require('sql-injection');
app.use(sqlinjection);
```

## Installation

    $ npm install sql-injection


## Usage

code example:

```js
var express = require('express');
var sqlinjection = require('sql-injection');

var app = express();

app.configure(function() {
    app.use(sqlinjection);  // add sql-injection middleware here
});

app.get('/route1', function(req, res) {
    res.send(200, {});
});
app.get('/route2/:uid', function(req, res) {
    res.send(200, {});
});
app.post('/route3', function(req, res) {
    res.send(200, {});
});
app.listen(3000);
```
