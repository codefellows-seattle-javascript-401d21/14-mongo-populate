This application uses mongodb and express to create a self containted server and API. To utilize this app please npm install to get the required packages.

In your terminal you can make any of the CRUD requests (post, put, delete, get). To use this application I recommend HTTPie. Once you have HTTPie installed you can make queries as follows.

To 'GET' all the object id's, you can type in http GET http://localhost:3000/api/v1/animal

The rest of the routes follow that example: 

To create a new record: http POST http://localhost:3000/api/v1/animal name=Giraffe legs=4 class=Mammal (name is required on all post requests)
To update a record: http PUT http://localhost:3000/api/v1/note/(animal_id) name=Sparrow legs=2 class=Bird
To delete record: http POST http://localhost:3000/api/v1/note/(animal_id)
To retrieve a single record: http POST http://localhost:3000/api/v1/note/(animal_id)

These requests can be found in the mongo database 'animals'.

The tests for this application have been updated, and will now test a multitude of routes and requests, both valid and invalid in an attempt to ensure the validity of the applications processes.