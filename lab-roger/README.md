# Project Title

Mongo Express Server



### Installing

To be able to use this at the user will need to install some dependencies, to do this type the following in the command line  
Say what the step will be

```
npm install
```
To start the server in a separate terminal tab
```
npm run start
```
To start the Mongo Database  
```
npm run start-db
```

This is a http server, so the following commands will allow you to post a new Country to the Mongo Database, delete, get, or update.

```
http http://localhost:3000/api/v1/country
```
Will return a list of all of the current countries.
```
http http://localhost:3000/api/v1/country/<record number>  
```
Will return that specific record
```
http POST http://localhost:3000/api/v1/country make=<make> model=<model> color=<color>  
```
Will create a new record.
```
http DELETE http http://localhost:3000/api/v1/country/<record number>
```
Will delete that record.
```
http PUT http http://localhost:3000/api/v1/country/<record number> color=<new color> model=<new model> make=<new make>
```
Will amend a record.



## Running the tests

```npm test```



## Authors

* **Roger Davenport** - RND -

## License

This project is licensed under the MIT License
