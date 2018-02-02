'use strict';

const debug = require('debug')('http:Album-delete-test');
const server = require('../../lib/server');
const superagent = require('superagent');
require('jest');

describe('Album DELETE Integration', function() {
  beforeAll(() => server.start());
  afterAll(() => server.stop());
  
  describe('Valid requests', () => {

    this.newAlbum = {
      title: 'Forest',
    };

    beforeAll(()=> {
      return  superagent.post(':4000/api/v1/album')
        .send(this.newAlbum)
        .then( res => {
          this.resPost = res;
          return;
        })
        .catch(err => {
          debug('superagent error ', err);
        });
    });

    describe('DELETE /api/v1/album/someid ', () => {
      
      beforeAll(() => {
        return superagent.delete(`:4000/api/v1/album/${this.resPost.body._id}`)
          .then(res => this.deleteRes = res);       
      });
      beforeAll(() => {
        return superagent.get(`:4000/api/v1/album/${this.resPost.body._id}`)
          .catch(err => this.getErr = err);       
      });

      it('should return status 404', () => {
        debug('this.deleteGeterr.status', this.getErr.status);
        expect(this.getErr.status).toEqual(404);
      });
      it('should return status code 204', () => {
        expect(this.deleteRes.status).toEqual(204);
      });
    });
  });

  // describe('Invalid requests', () => {

  //   beforeAll(() => {
  //     return superagent.delete(`:4000/api/v1/${this.resPost.body._id}`)
  //       .catch(err => this.deleteErr = err);       
  //   });
  //   beforeAll(() => {
  //     return superagent.delete(':4000/api/v1/image/98457737d9934wy6a9w45q90c')
  //       .catch(err => this.badDelete = err);       
  //   });

  //   it('should return status 404 when DELETE request to a bad path', () => {
  //     expect(this.deleteErr.status).toEqual(404);
  //   });

  //   it('should return status 404 when DELETE request with a bad id', () => {
  //     expect(this.badDelete.status).toEqual(400);
  //   });

  // });

});
