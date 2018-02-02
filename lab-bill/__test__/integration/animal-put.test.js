// 'use strict';

// const server = require('../../lib/server');
// const superagent = require('superagent');
// require('jest');

// describe('PUT /api/v1/animal', function() {
//   this.mockanimal = {name: 'donkey', legs: 4};
//   this.mockUpdate = {name: 'giraffe', legs: 4};
//   beforeAll(() => server.start());
//   afterAll(() => server.stop());

//   describe('Valid', () => {
//     beforeAll(() => {
//       return superagent.post(`:${process.env.PORT}/api/v1/animal`)
//         .send(this.mockanimal)
//         .then(res => this.response = res);
//     });

//     beforeAll(() => {
//       return superagent.get(`:${process.env.PORT}/api/v1/animal`)
//         .then(res => this.getAll = res);
//     });

//     beforeAll(() => {
//       return superagent.put(`:${process.env.PORT}/api/v1/animal/${this.getAll.body[0]}`)
//         .send(this.mockUpdate)
//         .then(res => this.putRes = res);
//     });

//     beforeAll(() => {
//       return superagent.get(`:${process.env.PORT}/api/v1/animal/${this.getAll.body[0]}`)
//         .then(res => this.getOne = res);
//     });

//     afterAll(() => {
//       return superagent.delete(`:${process.env.PORT}/api/v1/animal/${this.getAll.body[0]}`);
//     });

//     it('should respond with a status of 204', () => {
//       expect(this.putRes.status).toBe(204);
//     });
//     it('should keep the structure of the origin object', () => {
//       expect(this.getOne.body).toHaveProperty('name');
//       expect(this.getOne.body).toHaveProperty('legs');
//       expect(this.getOne.body).toHaveProperty('_id');
//     });
//     it('should have the values that we updated', () => {
//       expect(this.getOne.body.name).toEqual('giraffe');
//       expect(this.getOne.body.legs).toEqual(4);
//     });
//   });

//   describe('Invalid req/res', () => {
//     it('should return a status 404 on bad path', () => {
//       return superagent.put(`:${process.env.PORT}/api/v1/doesanimalxist`)
//         .send(this.mockUpdate)
//         .catch(err => {
//           expect(err.status).toBe(404);
//           expect(err.response.text).toMatch(/path error/i);
//         });
//     });
//     it('should return a status 404 on an id that does not exist', () => {
//       return superagent.put(`:${process.env.PORT}/api/v1/animal/1234`)
//         .send(this.mockUpdate)
//         .catch(err => expect(err.status).toBe(404));
//     });
//   });
// });