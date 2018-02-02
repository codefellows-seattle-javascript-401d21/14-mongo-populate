// 'use strict';

// const server = require('../../lib/server.js');
// const superagent = require('superagent');
// const Bike = require('../../model/bike.js');

// require('jest');

// describe('DELETE', function() {
//   this.mockBike = {year: '2010', color: 'blue', make: 'bianchi', category: 'road bike'};
//   beforeAll(server.start);
//   afterAll(server.stop);
//   afterAll(() => Promise.all([Bike.remove()]));

//   describe('Valid req/res', () => {
//     beforeAll(() => {
//       return superagent.post(':4000/api/v1/bike')
//         .send(this.mockBike)
//         .then(res => this.response = res);
//     });
//     beforeAll(() => {
//       return superagent.delete(`:4000/api/v1/bike/${this.response.body._id}`)
//         .then(res => {
//           this.delStat = res.status;
//         });
//     });
    
//     it('should return a status code 204', () => {
//       expect(this.delStat).toBe(204);
//     });
//     it('should no longer have a title', () => {
//       expect(this.response.make).toBe(undefined);
//     });
//     it('should no longer have an id', () => {
//       expect(this.response._id).toBe(undefined);
//     });
//   });

//   describe('Invalid req/res', () => {
//     it('should return a status code 404 with a bad schema', () => {
//       return superagent.delete(':4000/api/v1/doesnotexist')
//         .send()
//         .catch(err => {
//           expect(err.status).toBe(404);
//           expect(err.message).toMatch(/not found/i);
//         });
//     });
//     it('should return a status code 404 with a bad request', () => {
//       return superagent.delete(':4000/api/v1/note')
//         .send({title: '', content: ''})
//         .catch(err => {
//           expect(err.status).toBe(404);
//         });
//     });
//   });
// });