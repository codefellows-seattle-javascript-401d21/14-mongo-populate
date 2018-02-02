'use strict';

const server = require('../../lib/server');
const mocks = require('../lib/mocks');
const superagent = require('superagent');
// const faker = require('faker');
// const Cat = require('../../model/cat');
require('jest');


describe('GET /api/v1/cat', function () {
  beforeAll(() => this.base = `:${process.env.PORT}/api/v1/cat`);
  beforeAll(server.start);
  afterAll(server.stop);
  // afterEach(mocks.owner.removeAll());
  // afterEach(mocks.cat.removeAll());
  

  beforeAll(() => {
    return mocks.cat.createMany(10)
      .then(results => this.catData = results);
  });


  describe('Valid req/res for GET ALL', () => {
    it('should return an array of IDs given no ID parameter in the route', () => {
      return superagent.get(`${this.base}`)
        .then(res => {
          expect(res.body).toBeInstanceOf(Array);
          expect(res.body[0]).toMatch(/[A-Za-z0-9]{24}/);
          expect(res.body[7]).toMatch(/[A-Za-z0-9]{24}/);
          expect(res.body[10]).toMatch(/[A-Za-z0-9]{24}/);
        });
    });
    it('should return a status 200', () => {
      return superagent.get(`${this.base}`)
        .then(res => expect(res.status).toEqual(200));
    });
    it('should return a status 200 given a valid ID', () => {
      return superagent.get(`${this.base}/${this.catData.cats[0]._id}`)
        .then(res => expect(res.status).toEqual(200));
    });
    it('should return the correct data from a given objects ID', () => {
      return superagent.get(`${this.base}/${this.catData.cats[1]._id}`)
        .then(res => {
          expect(res.body[1]._id).toEqual(this.catData.cats[1]._id);
          // expect(res.body.title).toEqual(this.catData.cats[0].title);
          // expect(res.body.artist).toEqual(this.catData.cats[0].artist);
        });
    });
  });

  // describe('Valid req/res GET ONE', () => {

  //   it('should respond with a status of 200', () => {
  //     expect(this.response.status).toBe(200);
  //   });
  //   it('should get an item back and the title and content to match', () => {
  //     expect(temp.name).toMatch(/bill/);
  //     expect(temp.color).toMatch(/grey/);
  //   });
  //   it('should get an item back and have these properties', () => {
  //     expect(temp).toHaveProperty('name');
  //     expect(temp).toHaveProperty('color');
  //     expect(temp).toHaveProperty('age');
  //   });
  // });

  // describe('invalid req/res GET ONE', () => {
  //   beforeAll(() => {
  //     return superagent.post(':4000/api/v1/cat/')
  //       .send(this.mockCat)
  //       .then(res => this.response = res)
  //       .then(() => {
  //         return superagent.get(`:4000/api/v1/cat/asdf`)
  //           .catch(err => this.res = err);
  //       });
  //   });

  //   it('should respond with a status of 404', () => {
  //     expect(this.res.status).toBe(404);
  //   });
  // });

  // describe('invalid req/res GET ALL', () => {
  //   beforeAll(() => {
  //     return superagent.post(':4000/api/v1/cat/')
  //       .send(this.mockCat)
  //       .then(res => this.response = res)
  //       .then(() => {
  //         return superagent.get(`:4000/api/v1/no`)
  //           .catch(err => this.res = err);
  //       });
  //   });

  //   it('should respond with a status of 404', () => {
  //     expect(this.res.status).toBe(404);
  //   });
  // });
});

// it('should return an array of IDs given no ID parameter in the route', () => {
//   return superagent.get(`${this.base}`)
//   .then(res => {
//     expect(res.body).toBeInstanceOf(Array)
//     expect(res.body.includes(this.trackData.tracks[0]._id.toString())).toBeTruthy()
//     expect(res.body.includes(this.trackData.tracks[10]._id.toString())).toBeTruthy()
//     expect(res.body.includes(this.trackData.tracks[18]._id.toString())).toBeTruthy()
//   })
//   it('should return a status 200', () => {
//     return superagent.get(`${this.base}`)
//     .then(res => expect(res.status).toEqual(200))
//   })

//   it('should return a status 200 given a valid ID', () => {
//     return superagent.get(`${this.base}/${this.trackData.tracks[0]._id}`)
//     .then(res => expect(res.status).toEqual(200))
//   })
//   it('should return the correct data from a given objects ID', () => {
//     return superagent.get(`${this.base}/${this.trackData.tracks[0]._id}`)
//     .then(res => {
//       expect(res.body._id).toEqual(this.trackData.tracks[0]._id)
//       expect(res.body.title).toEqual(this.trackData.tracks[0].title)
//       expect(res.body.artist).toEqual(this.trackData.tracks[0].artist)
//     })
//   })
// })
// })