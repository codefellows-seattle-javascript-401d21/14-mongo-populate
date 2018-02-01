# Lab 14: Mongo/Express 2 Resource API

**Author**: Steve Carpenter
**Version**: 1.0.0

## Overview
This is a RESTful HTTP API that utilizes the MongoDB database. It currently
supports storing data about students and majors at school.

## Getting Started
The user needs to do the following to use this student based Express API with MongoDB
-Clone the repository from github [here](https://github.com/stevegcarpenter/14-mongoose-populate)
-Install all the necessary `npm` packages by executing `npm install`
-To run the `linter` check execute `npm run lint`
-There are two options to test the four HTTP methods (POST, GET, PUT, DELETE)
  -Start the nodemon server by executing `nodemon` and run manual requests
  -Run the integration tests via `npm run test` on the command line
-For manual requests, use a program like [HTTPie](https://httpie.org/) or [Postman](https://www.getpostman.com/).

## HTTP Method Directions
This RESTful HTTP server allows users to create simple descriptions of students and their major.
-_POST_: Endpoint - `/api/v1/student`, Supported body fields:
  -`full_name`: _required_ String
  -`student_id`: _optional_ String
  -`age`: _optional_ Number
  -`campus`: _optional_ String
-_GET_: Endpoint - `/api/v1/student/:_id`, No data fields allowed
-_PUT_: Endpoint - `/api/v1/student/:_id`, All fields are optional for a PUT request:
  -`full_name`: String
  -`student_id`: String
  -`age`: Number
  -`campus`: String
-_DELETE_: Endpoint - `/api/v1/student/:_id`, No data fields allowed

## Architecture
-NodeJS
-Express
-npm
-JS
-cors
-MongoDB

## Change Log

## Credits and Collaborations
[NodeJS](https://nodejs.org)
[npm](https://www.npmjs.com/)
[JavaScript](https://www.javascript.com/)
[Express](https://expressjs.com/)
[Cors](https://www.npmjs.com/package/cors)
[MongoDB](https://www.mongodb.com/)
