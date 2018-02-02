// 'use strict';

// const server = require('../../lib/server');
// const superagent = require('superagent');
// const mocks = require('../lib/mocks');
// const faker = require('faker');
// require('jest');

// describe('GET /api/v1/city', function () {
//   beforeAll(() => this.base = `:${process.env.PORT}/api/v1/city`);
//   beforeAll(server.start);
//   afterAll(server.stop);
//   afterEach(mocks.country.removeAll);
//   afterEach(mocks.city.removeAll);

//   describe('Valid requests', () => {
//     beforeAll(() => {
//       return mocks.city.createMany(25)
//         .then(results => {
          
//           this.cityData = results;
//           console.log('this.cityData', this.cityData);
        
        
//         });
//     });

//     it('should return an array of IDs given no ID parameter in the route', () => {
//       return superagent.get(`${this.base}`)
//         .then(res => {
//           expect(res.body).toBeInstanceOf(Array);
//           expect(res.body.includes(this.cityData.city[0]._id.toString())).toBeTruthy();
//           expect(res.body.includes(this.cityData.city[10]._id.toString())).toBeTruthy();
//           expect(res.body.includes(this.cityData.city[18]._id.toString())).toBeTruthy();
//         });
//     });
//     it('should return a status 200', () => {
//       return superagent.get(`${this.base}`)
//         .then(res => expect(res.status).toEqual(200));
//     });

//     it('should return a status 200 given a valid ID', () => {
//       return superagent.get(`${this.base}/${this.cityData.city[0]._id}`)
//         .then(res => expect(res.status).toEqual(200));
//     });
//     it('should return the correct data from a given objects ID', () => {
//       return superagent.get(`${this.base}/${this.cityData.city[0]._id}`)
//         .then(res => {
//           expect(res.body._id).toEqual(this.cityData.city[0]._id);
//           expect(res.body.title).toEqual(this.cityData.city[0].title);
//           expect(res.body.artist).toEqual(this.cityData.city[0].artist);
//         });
//     });
//   });
    
//   // describe('inValid requests', () => {
      
//   // });
// });
