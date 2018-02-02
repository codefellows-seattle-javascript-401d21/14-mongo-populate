'use strict';

const debug = require('debug')('http:image-get-test');
const server = require('../../lib/server');
const superagent = require('superagent');
const mocks = require('../lib/mock');
const faker = require('faker');
require('jest');

describe('image POST /api/v1/track', function() {
  this.url = `:${process.env.PORT}/api/v1/image`;
  beforeAll(() => server.start());
  afterAll(() => server.stop());
  afterEach(mocks.album.removeAll);
  afterEach(mocks.image.removeAll);

  debug('this.url', this.url);


  describe('Valid requests', () => {
    beforeAll(() => {
      return mocks.album.createOne()
        .then(album => this.album = album)
        .then(() => {
          this.image = {
            file_path: faker.image.imageUrl(),
            photographer: faker.name.findName(),
            title: faker.hacker.adjective(),
            description: faker.hacker.phrase(),
            album: this.album._id,
          };
          return superagent.post(`${this.url}`)
            .send(this.image)
            .then(res => this.resPost = res);
        });
    });

    describe('DELETE /api/v1/image/someid ', () => {
      
      beforeAll(() => {
        return superagent.delete(`${this.url}/${this.resPost.body._id}`)
          .then(res => this.deleteRes = res);       
      });
      beforeAll(() => {
        return superagent.get(`${this.url}/${this.resPost.body._id}`)
          .catch(err => this.getErr = err);       
      });

      it('should return status 404 for a get because the file was deleted', () => {
        debug('this.deleteGeterr.status', this.getErr.status);
        expect(this.getErr.status).toEqual(404);
      });
      it('should return status code 204', () => {
        expect(this.deleteRes.status).toEqual(204);
      });
    });
  });

  describe('Invalid requests', () => {

    beforeAll(() => {
      return superagent.delete(`${this.url}/badPath/${this.resPost.body._id}`)
        .catch(err => this.deleteErr = err);       
    });
    beforeAll(() => {
      return superagent.delete(`${this.url}/98457737d9934wy6a9w45q90c`)
        .catch(err => this.badDelete = err);       
    });

    it('should return status 404 when DELETE request to a bad path', () => {
      expect(this.deleteErr.status).toEqual(404);
    });

    it('should return status 404 when DELETE request with a bad id', () => {
      expect(this.badDelete.status).toEqual(400);
    });

  });

});
