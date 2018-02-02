
# LAB 14: Mongo/Express 2 Resource API


### Installing and How to use.

To install this program, place fork and 'git clone' this repo to your computer. From the terminal, navigate to  `lab-heath`. once there, install NPM but typing in , `nmp install` and httpie(done with home) after that you need to install uuid, express, body-parser, bluebird `npm i`. for devolper Dependencies are dotenv jest eslint do these with `npm i -D`
you also need to have HTTPIE installed via homebrew `brew install httpie` in the terminal. this will let you do the helpful commands inside of the terminal.



next you need to have these scripts adjusted in your package.json file.

```javascript
  "scripts": {
    "start": "node index.js",
    "start:watch": "nodemon index.js",
    "start:debug": "DEBUG=http* nodemon index.js",
    "test": "jest -i",
    "test:watch": "jest -i --watchAll",
    "test:debug": "DEBUG=http* jest -i",
    "lint": "eslint .",
    "lint:test": "npm run lint && npm test",
    "start-db": "mkdir -p ./data/db && mongod --dbpath ./data/db",
    "stop-db": "killall mongod"
  },
  ```

from there, you can go to your terminal and type, 

```javascript
node run start
```
and this will start up your server, if you do `npn run start:watch`, this will let you see it in your localhost in your browser.

you will also need to start up your mongoDB also with the code below on a diffferent termail

```javascript
node run start-db
```

### some helpful commands  

these are you basic commands 

to add owner do this.
```javascript
http POST http://localhost:3000/api/v1/owner name=tim
```

this should return this 

```javascript
{
    "__v": 0,
    "_id": "5a74170b71e03bfd6ba1ecda",
    "cats": [],
    "name": "tim"
}
```

now you can add a cat to it. with this 
```javascript
http POST http://localhost:3000/api/v1/owner name=tim
```

and look like this 
```javascript
{
    "__v": 0,
    "_id": "5a74175f71e03bfd6ba1ecdb",
    "age": 33,
    "color": "red",
    "createdAt": "2018-02-02T07:46:39.065Z",
    "name": "bigboy",
    "owner": "5a74170b71e03bfd6ba1ecda",
    "updatedAt": "2018-02-02T07:46:39.065Z"
}
```


to get all your cats.
```javascript
http GET http://localhost:3000/api/v1/cat
```
it should look like this

```javascript
[
    "5a72802ad66f7d355390e108",
    "5a728036d66f7d355390e109"
]
```

how to get just one cat
```javascript
http GET http://localhost:3000/api/v1/cat/5a728036d66f7d355390e109
```

```javascript
{
    "__v": 0,
    "_id": "5a74175f71e03bfd6ba1ecdb",
    "age": 33,
    "color": "red",
    "createdAt": "2018-02-02T07:46:39.065Z",
    "name": "bigboy",
    "owner": "5a74170b71e03bfd6ba1ecda",
    "updatedAt": "2018-02-02T07:46:39.065Z"
}
```


to update a cat.
```javascript
http PUT http://localhost:3000/api/v1/cat/5a728036d66f7d355390e109 name=amzing color=red age=55
```

now your run a `get one cat` and it should look like this

```javascript
{
    "__v": 0,
    "_id": "5a728036d66f7d355390e109",
    "age": 55,
    "color": "red",
    "createdAt": "2018-02-01T02:49:26.441Z",
    "name": "amzing",
    "updatedAt": "2018-02-01T02:52:00.987Z"
}
```

to delete a note.
```javascript
http DELETE http://localhost:3000/api/v1/cat/5a728036d66f7d355390e109
```  
and now you should have nothing is you do the GET command again.

you can also do the same with owners like so...
```javascript
http GET http://localhost:3000/api/v1/owner
```
will get you this

```javascript
[
    {
        "_id": "5a74170b71e03bfd6ba1ecda",
        "name": "tim"
    },
    {
        "_id": "5a74187271e03bfd6ba1ecdc",
        "name": "tim"
    }
]
```


you can also do the same with owners like so...
```javascript
http GET http://localhost:3000/api/v1/owner/5a74187271e03bfd6ba1ecdc
```
will get you this

```javascript
{
    "__v": 0,
    "_id": "5a7418bd71e03bfd6ba1ecdd",
    "cats": []
}
```

