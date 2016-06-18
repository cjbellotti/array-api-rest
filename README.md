# Array Api Rest

This module generate a express instance with a api rest for an array. It is useful for test a external CRUD.

### Instalation
```sh
$ npm install array-api-rest
```
### Example
```code
var express = require('express');
var arrayApiRest = require('array-api-rest');

var port = process.env.PORT || 3000;

var arrayData = [];

var app = express();

app.use(arrayApiRest(arrayData, {
    // Specify wich field is id (default 'id')
    ID : 'id',
    // Specify prefix for urls of API (default '')
    prefix : '',
    // Specify sufix for urls of API (default '')
    sufix : '',
    // Specify if you want to log de http request (default false)
    logRequest : false,
    // Specify the main name for the API (default 'name')
    restName : 'name'
});

app.listen(port);

```

It publublish the URIs

```
GET - /name
GET - /name/:id
POST - /name
PUT - /name/:id
DELETE - /name/:id
```

### Why

because I need it for test and I want to share it with you.
