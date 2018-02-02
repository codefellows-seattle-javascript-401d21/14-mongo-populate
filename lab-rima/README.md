## EXPRESS/MongoDB - Book storage

### `/api/v1/book`

##### `POST /` request

<Valid input>
  * pass data as stringified JSON in the body of a **POST** request to create a new note
  * this should return a 201 status code with the new record content

<Invalid input>
  * If no schema and/or no title and/or no content is/are sent, it rejects and throws an error with a 400 status

##### `GET / || /:_id` request

###### -- 1) fetch one specified by id
<Valid input>
  * pass `<uuid>` as a query string parameter to retrieve a specific resource (as JSON)
  * this should return a 200 status code with the requested record

<Invalid input>
  * If no schema and/or no id is/are sent, it rejects and throws an error with a status 400
  * If no item exists, it rejects and throws an error with a status 404

###### -- 2) fetch all specified by id
<Valid input>
  * retrieve all resource (as JSON)
  * this should return a 200 status code with the requested record

<Invalid input>
  * If no schema is sent, it rejects and throws an error with a status 400
  * If no schema exists, it rejects and throws an error with a status 404

##### `PUT /:_id` request

<Valid input>
  * pass `<uuid>` as a query string parameter, with a body of data to update a specific resource (as JSON)
  * this should return a 204 status code with no content in the body

<Invalid input>
  * If no schema and/or no id is/are sent, it rejects and throws an error with a status 400
  * If no item exists, it rejects and throws an error with a status 404

##### `DELETE /:_id` request

###### -- 1) delete one specified by id
<Valid input>
  * pass `<uuid>` in the query string to **DELETE** a specific resource
  * this should return a 204 status code with no content in the body

<Invalid input>
  * If no schema and/or no id is/are sent, it rejects and throws an error with a status 400
  * If no item exists, it rejects and throws an error with a status 404

###### -- 2) delete all specified by id
<Valid input>
  * delete all resource (as JSON)
  * this should return a 200 status code with the requested record

<Invalid input>
  * If no schema is sent, it rejects and throws an error with a status 400
  * If no schema exists, it rejects and throws an error with a status 404
 
#### How to use
git clone this repo in your desired location
```
git clone <this repo's clone ssh>
```
install dependencies
```
npm install
```
start server
```
node index.js
```
