'use strict';
const debug = require('debug')('http:image-put-test');
const server = require('../../lib/server');
const superagent = require('superagent');
const mocks = require('../lib/mock');
const faker = require('faker');
require('jest');

describe('image PUT/api/v1/track', function() {
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

          this.updateImage = {
            title: faker.hacker.adjective(),
            description: faker.hacker.phrase(),
          };
      
          return superagent.post(`${this.url}`)
            .send(this.image)
            .then(res => this.resPost = res);
        });
    });

    describe('PUT /api/v1/image/someid => update', () => {
      beforeAll(() => {
        return superagent.put(`${this.url}/${this.resPost.body._id}`)
          .send(this.updateImage)
          .then(res => this.put = res);       
      });
      beforeAll(() => {
        return superagent.get(`${this.url}/${this.resPost.body._id}`)
          .then(res => this.putGet = res);       
      });

      it('should subject should be new', () => {
        expect(this.putGet.body.title).toEqual(this.updateImage.title);
      });

      it(' id should be the same', () => { 
        expect(this.putGet.body._id).not.toEqual(this.resPost._id);
      });

      it('should return status code 204', () => {
        expect(this.put.status).toEqual(204);
      });
    });

  });

  describe('Invalid requests', () => {

    describe('PUT /api/v1/image/someid => update', () => {
      beforeAll(() => {
        return superagent.put(`${this.url}/489736983F2939A938489E9W348C`)
          .send(this.updateImage)
          .catch(err => this.putErr = err );    
      });

      it('should return status code 400 for an update with a bad id', () => {
        expect(this.putErr.status).toEqual(400);
      });

      beforeAll(() => {
        return superagent.put(`${this.url}//${this.resPost.body._id}`)
          .send(this.newImage)
          .catch(err => this.putEmpty = err );    
      });

      it('should return status code 404 for bad path', () => {
        expect(this.putEmpty.status).toEqual(404);
      });
    }); 
  });
});