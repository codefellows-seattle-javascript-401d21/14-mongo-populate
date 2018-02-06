## Lab 14 - Double Mongo Resource

This project creates a single resource API using the express framework.  It also uses 3rd party middleware and custom middleware.  The data is persisted with a Mongo database.  

This project has two storage resources in Mongo - book and author.
Author is the "wrapper" storage for books.  That is, one author can have many books.

### Installation
Fork this repository and install on your machine using git clone.  Switch to the lab-karen folder.

This project requires Node JS and npm( Node package manager). You will also need a method to create RESTFUL operation statement; a utility like HTTPie or Postman will do this.

Run *npm init* to set up program dependancies.
Use *npm i express mongoose body-parser cors* to install dependancies for (in order)
- express  which provides a thin layer of fundamental web application features to create an API
- mongoose which acts as an interface between javascript and Mongo DB
- body-parser which parses incoming request bodies in a middleware before your handlers, in the req.body property
- handling cross origin resource sharing.

Use *npm i -D jest eslist superagent dotenv debug faker* to install developer dependancies for (in order)
- testing
- linting
- for making CRUD requests
- setting up the environment variables
- for debugging the development process
- creates "fake" data for testing.

## Before making RESTFUL requests
In the terminal, start the server with the *npm run start:watch* command.  In another terminal window, start the Mongo DB with the command *npm rum start-db*.  In a third window, make the CRUD requests, using HHTPie or Postman.

## Accessing each method
The CRUD operations can be entered from the CLI using a utility like HTTpie. The format is http CRUD method, the localhost:PORT, the route and the the information be send/updated/deleted from storage.  

_HTTPie command_
http

_PORT_
In these examples, the PORT=4000.

_Paths_
Since there are two db resources, there are two paths.
The book route is /api/v1/books.
The author route is /api/v1/author.

_Read Method (GET)_

GET request for all the items in the database.  Returns an array of ids.
- http GET http://localhost:4000/api/v1/book
- http GET http://localhost:4000/api/v1/author

GET request for one record, where "unique-id" is the id of an existing record
- http GET http://localhost:4000/api/v1/book/"unique-id"
- http GET http://localhost:4000/api/v1/author/"unique-id"

 _Create Method (POST)_
POST request to create a new record The "unique-id" is generated when a new record is created. Only the title is required. Year is a number, all others are strings.
- http POST http://localhost:4000/api/v1/author name=author_name
- http POST http://localhost:4000/api/v1/book title=test year=2018

 _Update Method (PUT)_
PUT request to update a record, where "unique-id" is the id of the record to update. For the book route, either or both properties can be updated.
- http PUT http://localhost:4000/api/v1/author/"unique-id" name=update
- http PUT http://localhost:4000/api/v1/book/"unique-id" title=new year=2017

 _Delete Method (DELETE)_
DELETE request to delete one record, where "unique-id" is the id of an existing record.
- http DELETE http://localhost:4000/api/v1/book/"unique-id"
- http DELETE http://localhost:4000/api/v1/book/"unique-id"


### Running tests
From the command line, type *npm run test:watch* to start testing.
