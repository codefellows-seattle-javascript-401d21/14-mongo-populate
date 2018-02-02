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

    describe('GET /api/v1/image/someid =>', () => {
    
      beforeAll(() => {
        debug('this.resPost.body._id', this.resPost.body._id);
        return superagent.get(`${this.url}/${this.resPost.body._id}`)
          .then(res => this.getOne = res)
          .catch(console.error);       
      });
  
      it('should return json data', () => {
        debug('this.getOne.body', this.getOne.body);
        expect(this.getOne.body._id).toEqual(this.resPost.body._id);
      });

      it('should return status code 200', () => {
        expect(this.getOne.status).toEqual(200);
      });

      it('should contain an album object that contains album title', () => {
        expect(this.getOne.body.album.title).toEqual(this.album.title);
      });

    });

  });

  describe('Invalid requests', () => {

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
    beforeAll(() => {
      return superagent.get(`${this.url}/749363490365a940f8593e957f836c3`)
        .catch(err => this.getErr = err);       
    });

    it('should return a 404 error for an id that is bad...', () => {
      expect(this.getErr.status).toBe(400);
    });

    beforeAll(() => {
      return superagent.get(`:4000/api/v1/${this.resPost.body._id}`)
        .catch(err => this.missingErr = err);       
    });

    it('should return status 404 for a GET request to a bad path', () => {
      debug('this.deleteGeterr.status', this.getErr.status);
      expect(this.missingErr.status).toEqual(404);
    });
    
    beforeAll(() => {
      return superagent.delete(`${this.url}/${this.resPost.body._id}`)
        .then(res => this.deleteRes = res);       
    });
    beforeAll(() => {
      return superagent.get(`:${this.url}/${this.resPost.body._id}`)
        .catch(err => this.missingErr = err);       
    });

    it('should return status 404 if an id is not in the database', () => {
      debug('this.deleteGeterr.status', this.getErr.status);
      expect(this.missingErr.status).toEqual(404);
    });


  });


});


    
        