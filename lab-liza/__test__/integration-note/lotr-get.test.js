// 'use strict';

// // Testing Dependencies
// const server = require('../../lib/server');
// const superagent = require('superagent');
// require('jest');

// // Test Variables
// let port = process.env.PORT;
// let idHolder, api = `:${port}/api/v1/lotr`;

// describe('Server module', () => {
//   this.mockCharacter = { name: 'Sam', species: 'Hobbit' };
//   beforeAll(() => server.start(port, () => console.log(`listening on ${port}`)));
//   afterAll(() => server.stop());

//   describe('GET /api/v1/lotr', () => {
//     beforeAll(() => {
//       return superagent.post(api)
//         .send(this.mockCharacter);
//     });
//     describe('Valid Routes/Data', () => {
//       beforeAll(() => {
//         return superagent.get(api)
//           .then(res => this.response = res);
//       });
//       it('Should respond with a status 200', () => {
//         expect(this.response.status).toBe(200);
//       });
//       it('Should respond with all characters', () => {
//         idHolder = this.response.body[0];
//         expect(this.response.body).toBeTruthy();
//       });
//     });

//     describe('Invalid Routes/Data', () => {
//       it('Should respond a 404 bad path when given an incorrect path', () => {
//         return superagent.get(`${api}/invalididparameter`)
//           .catch(err => {
//             expect(err.status).toBe(404);
//           });
//       });
//     });
//   });
// });
'use strict'

const server = require('../../lib/server')
const superagent = require('superagent')
const mocks = require('../lib/mocks')
const faker = require('faker')
require('jest')

describe('GET /api/v1/lotr', function () {
  beforeAll(() => this.base = `:${process.env.PORT}/api/v1/lotr`)
  beforeAll(server.start)
  afterAll(server.stop)
  afterEach(mocks.species.removeAll)
  afterEach(mocks.lotr.removeAll)

  describe('Valid requests', () => {
    beforeAll(() => {
      return mocks.lotr.createMany(25)
      .then(results => this.lotrData = results)
    })

    it('should return an array of IDs given no ID parameter in the route', () => {
      return superagent.get(`${this.base}`)
      .then(res => {
        expect(res.body).toBeInstanceOf(Array)
        expect(res.body.includes(this.lotrData.lotr[0]._id.toString())).toBeTruthy()
        expect(res.body.includes(this.lotrData.lotr[10]._id.toString())).toBeTruthy()
        expect(res.body.includes(this.lotrData.lotr[18]._id.toString())).toBeTruthy()
      })
      it('should return a status 200', () => {
        return superagent.get(`${this.base}`)
        .then(res => expect(res.status).toEqual(200))
      })

      it('should return a status 200 given a valid ID', () => {
        return superagent.get(`${this.base}/${this.lotrData.lotr[0]._id}`)
        .then(res => expect(res.status).toEqual(200))
      })
      it('should return the correct data from a given objects ID', () => {
        return superagent.get(`${this.base}/${this.lotrData.lotr[0]._id}`)
        .then(res => {
          expect(res.body._id).toEqual(this.lotrData.lotr[0]._id)
          expect(res.body.title).toEqual(this.lotrData.lotr[0].title)
          expect(res.body.artist).toEqual(this.lotrData.lotr[0].artist)
        })
      })
    })
  })

  describe('inValid requests', () => {

  })
})