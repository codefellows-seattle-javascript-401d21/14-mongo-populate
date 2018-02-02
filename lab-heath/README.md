
# LAB 13: Single Resource Mongo and Express API


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


### some helpful commands  

these are you basic commands 

to add note to it.
```javascript
http POST http://localhost:3000/api/v1/cat name=bigboy color=grey age=32
```

this should return this 

```javascript
{
    "__v": 0,
    "_id": "5a72802ad66f7d355390e108",
    "age": 32,
    "color": "grey",
    "createdAt": "2018-02-01T02:49:14.128Z",
    "name": "bigboy",
    "updatedAt": "2018-02-01T02:49:14.128Z"
}
```


to get all your notes.
```javascript
http GET http://localhost:3000/api/v1/cat
```
it will get all the notes that in memory and it should look like this. here we have 2 notes passed back to storage and these are the UUID's

```javascript
[
    "5a72802ad66f7d355390e108",
    "5a728036d66f7d355390e109"
]
```

use this to just get one of your notes. you do need to use the ID for it from the get all.(from above)
```javascript
http GET http://localhost:3000/api/v1/cat/5a728036d66f7d355390e109
```
it will get the notes that in the storage file under the notes subfolder and it should look like this.

```javascript
{
    "__v": 0,
    "_id": "5a728036d66f7d355390e109",
    "age": 32,
    "color": "grey",
    "createdAt": "2018-02-01T02:49:26.441Z",
    "name": "bigboy",
    "updatedAt": "2018-02-01T02:49:26.441Z"
}
```


to update a note.
```javascript
http PUT http://localhost:3000/api/v1/cat/5a728036d66f7d355390e109 name=amzing color=red age=55
```

now your run a `get one note` and it should look like this

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

## function code for the GET

```javascript
.get((req, res) => {
      if(req.params._id) {
        return Cat.findById(req.params._id)
          .then(cat => res.status(200).json(cat))
          .catch(err => errorHandler(err, res));
      }
      return Cat.find()
        .then(cat => cat.map(cat => cat._id))
        .then(cat => res.status(200).json(cat))
        .catch(err => errorHandler(err, res));
    })
  ```

## function code for the POST one

```javascript
.post(bodyParser, (req, res) => {
      new Cat(req.body).save()
        .then(cat => res.status(201).json(cat))
        .catch(err => errorHandler(err, res));
    })
  ```
  for the storage side

  ```javascript
storage.fetchOne = (schema, itemId) => fs.readFileProm(`${__dirname}/../data/${schema}/${itemId}.json`);
```


## function code for the PUT

```javascript
.put(bodyParser, (req, res) => {
      Cat.findByIdAndUpdate(req.params._id, req.body)
        .then(() => res.sendStatus(204))
        .catch(err => errorHandler(err, res)); 
    })
  ```


## function code for the DELETE

```javascript
.delete((req, res) => {
      Cat.findByIdAndRemove(req.params._id)
        .then(() => res.sendStatus(204))
        .catch(err => errorHandler(err, res)); 
    });
  ```


# tests....

run the command npm run test to start of the tests for this app.

test for note-delete.test.js

```javascript
describe('DELETE /api/v1/cat', function () {
  beforeAll(() => server.start());
  afterAll(() => server.stop());

  this.mockCat = {name: 'bill', color: 'grey', age: 34};
  let temp;

  beforeAll(() => {
    return superagent.post(':4000/api/v1/cat')
      .send(this.mockCat)
      .then(res => {
        temp = res.body;
        this.response = res;
      })
      .then(() => {
        return superagent.delete(`:4000/api/v1/cat/${temp._id}`)
          .then(res => this.resTwo = res);
      });
  });

  describe('Valid req/res', () => {
    it('should respond with a status of 201', () => {
      expect(this.resTwo.status).toBe(204);
    });
    it('should respond with a status of 201', () => {
      expect(this.resTwo.body).toEqual({});
    });
  });

  describe('Invalid req/res', () => {
    it('should return a status 404 on bad path', () => {
      return superagent.delete(':4000/api/v1/doesNotExist')
        .catch(err => {
          expect(err.status).toBe(404);
          expect(err.response.text).toMatch(/path error/i);
        });
    });
    it('should return a status 404 on bad request body', () => {
      return superagent.delete(':4000/api/v1/cat')
        .send({})
        .catch(err => expect(err.status).toBe(404));
    });
  });
});
```

test for note-get.test

```javascript
describe('GET /api/v1/cat', function () {
  beforeAll(() => server.start());
  afterAll(() => server.stop());

  
  this.mockCat = {name: 'bill', color: 'grey', age: 34};
  this.mockCat2 = {name: 'heath', color: 'grey', age: 34};
  
  beforeAll(() => {
    return superagent.post(':4000/api/v1/cat/')
      .send(this.mockCat)
      .then(() => {
        return superagent.post(':4000/api/v1/cat/')
          .send(this.mockCat2)
          .then(res => {
            this.response = res;
          });
      });
  });

  describe('Valid req/res for GET ALL', () => {
    beforeAll(() => {
      return superagent.get(':4000/api/v1/cat')
        .then(res => this.response = res);
    });

    it('should respond with a status of 200', () => {
      expect(this.response.status).toBe(200);
    });
    it('should get an array of 2 items and have ids to match', () => {
      expect(this.response.body[0]).toMatch(/[0-9a-f]{24}/);
    });
    it('should respond with array lengthn of 2 or more', () => {
      expect(this.response.body.length).toBeGreaterThanOrEqual(2);
    });
  });


  describe('Valid req/res GET ONE', () => {
    let temp;
    beforeAll(() => {
      return superagent.post(':4000/api/v1/cat/')
        .send(this.mockCat)
        .then(res => {
          temp = res.body;
          this.response = res;
        })
        .then(() => {
          return superagent.get(`:4000/api/v1/cat/${temp._id}`)
            .then(res => this.response = res);
        });
    });

    it('should respond with a status of 200', () => {
      expect(this.response.status).toBe(200);
    });
    it('should get an item back and the title and content to match', () => {
      expect(temp.name).toMatch(/bill/);
      expect(temp.color).toMatch(/grey/);
    });
    it('should get an item back and have these properties', () => {
      expect(temp).toHaveProperty('name');
      expect(temp).toHaveProperty('color');
      expect(temp).toHaveProperty('age');
    });
  });

  describe('invalid req/res GET ONE', () => {
    beforeAll(() => {
      return superagent.post(':4000/api/v1/cat/')
        .send(this.mockCat)
        .then(res => this.response = res)
        .then(() => {
          return superagent.get(`:4000/api/v1/cat/asdf`)
            .catch(err => this.res = err);
        });
    });

    it('should respond with a status of 404', () => {
      expect(this.res.status).toBe(404);
    });
  });

  describe('invalid req/res GET ALL', () => {
    beforeAll(() => {
      return superagent.post(':4000/api/v1/cat/')
        .send(this.mockCat)
        .then(res => this.response = res)
        .then(() => {
          return superagent.get(`:4000/api/v1/no`)
            .catch(err => this.res = err);
        });
    });

    it('should respond with a status of 404', () => {
      expect(this.res.status).toBe(404);
    });
  });
});
```

test for note-post.test

```javascript
describe('POST /api/v1/cat', function() {
  this.mockCat = {name: 'bill', color: 'grey', age: 34};

  beforeAll(() => server.start());
  afterAll(() => server.stop());

  describe('Valid req/res', () => {
    beforeAll(() => {
      return superagent.post(':4000/api/v1/cat')
        .send(this.mockCat)
        .then(res => this.response = res);
    });

    it('should respond with a status of 201', () => {
      expect(this.response.status).toBe(201);
    });
    it('should post a new note with name, data, and _id', () => {
      expect(this.response.body).toHaveProperty('name');
      expect(this.response.body).toHaveProperty('color');
      expect(this.response.body).toHaveProperty('age');
    });
  });

  describe('Invalid req/res', () => {
    it('should return a status 404 on bad path', () => {
      return superagent.post(':4000/api/v1/doesNotExist')
        .send(this.mockCat)
        .catch(err => {
          expect(err.status).toBe(404);
          expect(err.response.text).toMatch(/path error/i);
        });
    });
    it('should return a status 400 on bad request body', () => {
      return superagent.post(':4000/api/v1/cat')
        .send({})
        .catch(err => expect(err.status).toBe(400));
    });
  });
});
```

test for note-put.test.js
```javascript
describe('PUT /api/v1/cat', function () {
  beforeAll(() => server.start(process.env.PORT, (err) => console.log(`Listening on ${process.env.PORT}`)));
  afterAll(() => server.stop());

  this.mockCat = {name: 'bill', color: 'grey', age: 34};
  this.mockCat2 = {name: 'heath', color: 'grey', age: 34};
  let temp;

  beforeAll(() => {
    return superagent.post(':4000/api/v1/cat')
      .send(this.mockCat)
      .then(res => {
        temp = res.body;
        this.response = res;
      })
      .then(() => {
        return superagent.put(`:4000/api/v1/cat/${temp._id}`)
          .send(this.mockCat2)
          .then(res => this.resTwo = res);
      });
  });

  describe('Valid req/res', () => {
    it('should respond with a status of 204', () => {
      expect(this.resTwo.status).toBe(204);
    });
    it('should updated data should not be the orignal data.', () => {
      expect(this.response.body.title).not.toBe(/hello/);
      expect(this.response.body.content).not.toBe(/hello world/);
    });
    it('should get an item back and have these properties', () => {
      expect(this.response.body).toHaveProperty('name');
      expect(this.response.body).toHaveProperty('color');
      expect(this.response.body).toHaveProperty('age');
    });
  });
  
  describe('invalid req/res PUT', () => {
    beforeAll(() => {
      return superagent.put(`:4000/api/v1/cat/mihnigf`)
        .send(this.mockCat2)
        .catch(res => this.resTest = res);
    });

    it('should respond with a status of 404', () => {
      expect(this.resTest.status).toBe(404);
    });
  });
});
```

test for error-handler.test
```javascript
describe('error-handler', function() {
  this.validation = new Error('Validation error: Cannot create note, subject or comment missing');
  this.res = { status: function(stat){this.statusCode = stat; return this; }, send: function(msg){this.message  = msg; return this;}};

  this.enoent = new Error('enoent');
  this.path_error = new Error('path error');
  this.fail = new Error('fail');
  this.objectId = new Error('objectid failed');
  this.duplicate = new Error('duplicate key');

  it('should respond with a status of 400', () => {
    let errRes = test(this.validation, this.res);
    expect(errRes.statusCode).toEqual(400);
  });
  it('should respond with a status of 404', () => {
    let errRes = test(this.enoent, this.res);
    expect(errRes.statusCode).toEqual(404);
  });
  it('should respond with a status of 404', () => {
    let errRes = test(this.path_error, this.res);
    expect(errRes.statusCode).toEqual(404);
  });
  it('should respond with a status of 500', () => {
    let errRes = test(this.fail, this.res);
    expect(errRes.statusCode).toEqual(500);
  });
  it('should respond with a status of 404', () => {
    let errRes = test(this.objectId, this.res);
    expect(errRes.statusCode).toEqual(404);
  });
  it('should respond with a status of 409', () => {
    let errRes = test(this.duplicate, this.res);
    expect(errRes.statusCode).toEqual(409);
  });
});
```



