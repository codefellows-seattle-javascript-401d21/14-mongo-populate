## Lab 13 - Mongo-Mongoose

This project creates a single resource API using the express framework.  It also uses 3rd party middleware and custom middleware.  The data is persisted with a Mongo database.

### Installation
Fork this repository and install on your machine using git clone.  Switch to the lab-karen folder.

This project requires Node JS and npm( Node package manager). You will also need a method to create RESTFUL operation statement; a utility like HTTPie or Postman will do this.

Run *npm init* to set up program dependancies.
Use *npm i express mongoose body-parser cors* to install dependancies for (in order)
- express  which provides a thin layer of fundamental web application features to create an API
- mongoose which acts as an interface between javascript and Mongo DB
- body-parser which parses incoming request bodies in a middleware before your handlers, in the req.body property
- handling cross origin resource sharing.

Use *npm i -D jest eslist superagent dotenv debug* to install developer dependancies for (in order)
- testing
- linting
- for making CRUD requests
- setting up the environment variables
- for debugging the development process.

## Before making RESTFUL requests
In the terminal, start the server with the *npm run start:watch* command.  In another terminal window, start the Mongo DB with the command *npm rum start-db*.  In a third window, make the CRUD requests.

## Accessing each method
The CRUD operations can be entered from the CLI using a utility like HTTpie. The format is http CRUD method, the localhost:PORT, the route and the the information be send/updated/deleted from storage.  In these examples, the PORT=4000.

GET request for all the items in the database.  Returns an array of ids.
 GET http://localhost:4000/api/v1/book/

GET request for one record, where "unique-id" is the id of an existing record
 GET http://localhost:4000/api/v1/book/"unique-id"

POST request to create a new record The "unique-id" is generated when a new record is created. Only the title is required. Year is a number, all others are strings.
 POST http://localhost:4000/api/v1/book title=test author=smith year=2018 category=fiction

PUT request to update a record, where "unique-id" is the id of the record to update.
http PUT http://localhost:4000/api/v1/book/"unique-id" title=test author=smith year=2018 category=fiction

DELETE request to delete one record, where "unique-id" is the id of an existing record.
 DELETE http://localhost:4000/api/v1/book/"unique-id"


### Running tests
From the command line, type *npm run test:watch* to start testing.
