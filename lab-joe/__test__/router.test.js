'use strict';

const superagent = require('superagent');
const server = require('../lib/server');
require('jest');
const PORT = process.env.PORT;

describe('Route-dog module', function () {
    this.ep = `:${PORT}/api/v1`;

    beforeAll(() => server.start(process.env.PORT, (err) => {
        if (err) {
            console.error(`Error Starting Server: ${err}`);
            return;
        }
        console.log(`Listening on PORT ${process.env.PORT}`);
    }));

    afterAll(() => server.stop());

    describe('Invalid GET request using fakepath', () => {
        describe('GET /fakepath', () => {
            it('should respond with 404 status when a /fakepath is used', () => {
                return superagent.get(`${this.ep}/fakepath`)
                    .catch(err => expect(err.status).toBe(404));
            });
        });
    });

    describe('Valid GET request', () => {
        describe('GET /dog', () => {
            it('should respond with 200 status', () => {
                return superagent.get(`${this.ep}/dog`)
                    .then(res => expect(res.status).toBe(200));
            });
        });
    });

    describe('Invalid POST request', () => {
        describe('POST /dog', () => {
            it('should respond with a status 400 when :_id is not provided', () => {
                return superagent.post(`${this.ep}/dog`)
                    .catch(err => expect(err.status).toBe(400));
            });
        });
    });

    // describe('Valid POST request, ', () => {
    //     describe('POST /dog/:_id', () => {
    //         it('should respond with 201 status', () => {
    //             return superagent.post(`${this.ep}/dog/`)
    //                 .send({ name: 'Pinkie', age: 1 })
    //                 .then(res => expect(res.status).toBe(201));
    //         });
    //     });
    // });

    describe('Invalid PUT request', () => {
        describe('PUT /dog', () => {
            it('should respond with 400 status when no :_id is provided', () => {
                return superagent.put(`${this.ep}/dog`)
                    .catch(err => expect(err.status).toBe(400));
            });
        });
    });

    // describe('Valid PUT request', () => {
    //     describe('PUT /dog/:_id', () => {
    //         it('should respond with a status 204 following a successful PUT request', () => {
    //             let id;
    //             return superagent.post(`${this.ep}/dog`)
    //                 .send({ name: 'Buddy', age: 12 })
    //                 .then(res => id = res.body._id)
    //                 .then(() => {
    //                     return superagent.put(`${this.ep}/dog/${id}`)
    //                         .send({ name: 'Buddy', age: 17 })
    //                         .then(res => expect(res.status).toBe(204));
    //                 });
    //         });
    //     });
    // });

    describe('Invalid DELETE request', () => {
        describe('DELETE /dog', () => {
            it('should respond with a status 400 when given a delete request without an :_id in the URL', () => {
                return superagent.delete(`${this.ep}/dog`)
                    .catch(err => expect(err.status).toBe(400));
            });
        });
    });

    // describe('Valid DELETE Request', () => {
    //     describe('DELETE /dog/:_id', () => {
    //         it('should respond with a status 204 on a successful deletion', () => {
    //             let id;
    //             return superagent.post(`${this.ep}/dog`)
    //                 .send({ name: 'Fluggy', age: 6 })
    //                 .then(res => id = res.body._id)
    //                 .then(() => {
    //                     return superagent.delete(`${this.ep}/dog/${id}`)
    //                         .then(res => expect(res.status).toBe(204));
    //                 });
    //         });
    //     });
    // });
});