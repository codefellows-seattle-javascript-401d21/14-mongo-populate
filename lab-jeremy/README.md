# General information
_Author_: Jeremy Pearson

_Version_: 1.0.0

_Libraries_: jest/dotenv/body-parser/eslint/express/debug/superagent

_Last modified_: 2/1/2018

# Function use

## Updates
Added in all the tests!

## Example
[output] = function([inputs])

_Brief description_

## Challenge functions
Champ Constructor {
  'name': { type: String, required: true },
  'type': { type: String, required: true },
  'main_lane': { type: String, required: true },
  'winrate_percent': { type: Number, required: true },
}

Takes in the following arguments to generate a mongoose.Schema object for database usage.

## API Routes and methods
Method: GET

ROUTE: /api/v1/champ

RETURNS: A LIST OF ALL NOTE ITEM IDS
<br>
<br>
Method: GET

ROUTE: /api/v1/champ/:_id

RETURNS: A JS ITEM WITH THE SPECIFIED CHAMPION OBJECT
<br>
<br>
Method: PUT

ROUTE: /api/v1/champ/:_id _id=\_id name=name type=type main\_lane=main\_lane winrate\_percent=winrate\_percent \_id=[ALREADY INSTANTIATED ID]

RETURNS: NOTHING IF SUCCESSFUL
<br>
<br>
Method: POST

ROUTE: /api/v1/champ/:_id name=name type=type main\_lane=main\_lane winrate\_percent=winrate\_percent

RETURNS: A NEW JS ITEM THAT WAS CREATED
<br>
<br>
Method: DELETE

ROUTE: /api/v1/champ/:_id

RETURNS: NOTHING IF SUCCESSFUL

# Lab Readme (SPECS)

13: Single Resource Mongo and Express API
Submission Instructions
fork this repository & create a new branch for your work
write all of your code in a directory named lab- + <your name> e.g. lab-susan
push to your repository
submit a pull request to this repository
submit a link to your PR in canvas
write a question and observation on canvas
Learning Objectives
students will be able to work with the MongoDB database management system
students will understand the primary concepts of working with a NoSQL database management system
students will be able to create custom data models (schemas) through the use of mongoose.js
students will be able to use mongoose.js helper methods for interacting with their database persistence layer
Requirements
Configuration
package.json
.eslintrc
.gitignore
README.md
your README.md should include detailed instructions on how to use your API
Feature Tasks
create an HTTP Server using express
create a resource model of your choice that uses mongoose.Schema and mongoose.model
use the body-parser express middleware to parse the req body on POST and PUT requests
use the npm debug module to log the functions and methods that are being used in your application
use the express Router to create a route for doing RESTFUL CRUD operations against your model
Server Endpoints
/api/resource-name
POST request
should pass data as stringifed JSON in the body of a post request to create a new resource
/api/resource-name/:id
GET request
should pass the id of a resource through the url endpoint to get a resource
this should use req.params, not querystring parameters
PUT request
should pass data as stringifed JSON in the body of a put request to update a pre-existing resource
DELETE request
should pass the id of a resource though the url endpoint to delete a resource
this should use req.params
Tests
create a test that will ensure that your API returns a status code of 404 for routes that have not been registered
create a series of tests to ensure that your /api/resource-name endpoint responds as described for each condition below:
GET - test 200, returns a resource with a valid body
GET - test 404, respond with 'not found' for valid requests made with an id that was not found
PUT - test 200, returns a resource with an updated body
PUT - test 400, responds with 'bad request' if no request body was provided
PUT - test 404, responds with 'not found' for valid requests made with an id that was not found
POST - test 400, responds with 'bad request' if no request body was provided
POST - test 200, returns a resource for requests made with a valid body
Bonus
2pts: a GET request to /api/resource-name should return an array of stored resources