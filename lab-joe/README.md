Lab 14 - mongo double resource

This is a RESTful HTTP API that utilizes the MongoDB database. It currently
supports storing data about dogs and breeds.

This RESTful HTTP server allows users to create simple descriptions of students and their major.
-_POST_: Endpoint - `/api/v1/dog`, Supported body fields:
  -`name`: _required_ String
  -`dog_id`: _optional_ String
  -`age`: _optional_ Number
  -`breed`: _optional_ String
-_GET_: Endpoint - `/api/v1/dog/:_id`, No data fields allowed
-_PUT_: Endpoint - `/api/v1/dog/:_id`, All fields are optional for a PUT request:
  -`name`: String
  -`dog_id`: String
  -`age`: Number
  -`breed`: String
-_DELETE_: Endpoint - `/api/v1/dog/:_id`, No data fields allowed
