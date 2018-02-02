# Lab 14: Mongo populate


To install the app clone the git repository. To run the app using nodemon type: 'nodemon server.js' on the terminal commmand line.
The dependencies are:
body-parser
express
cors
mongoose

The developer dependecies are: jest, superagent, debug and dotenv To install: NPM i -D 'dependency name'. To get debug messages use: npm run start:debug

To start Mogono DB:
mongod --dbpath ./data/db

To start server:
npm run start:watch

Use Postman or httpie to make a request.

Below are sample requests and responses using httpie:

http GET http://localhost:3000/api/v1/mc

{
        "__v": 0,
        "_id": "5a7273d3cb569131b750e649",
        "createdAt": "2018-02-01T01:56:35.651Z",
        "make": "Honda",
        "model": "CBX",
        "updatedAt": "2018-02-01T01:56:35.651Z"
    }

http POST http://localhost:3000/api/v1/mc/5a72423974b5221331d548e6 make='Bultaco' model='Tallas'

{
    "__v": 0,
    "_id": "5a727601e5e41932ec8f5294",
    "createdAt": "2018-02-01T02:05:53.620Z",
    "make": "Bultaco",
    "model": "Tallas",
    "updatedAt": "2018-02-01T02:05:53.620Z"
}

http PUT http://localhost:3000/api/v1/mc/5a727601e5e41932ec8f5294 model='Sherpa'

{
        "__v": 0,
        "_id": "5a727601e5e41932ec8f5294",
        "createdAt": "2018-02-01T02:05:53.620Z",
        "make": "Bultaco",
        "model": "Sherpa",
        "updatedAt": "2018-02-01T02:07:37.522Z"
    }

http DELETE http://localhost:3000/api/v1/mc/5a7273d3cb569131b750e648


Colloaorator(s):