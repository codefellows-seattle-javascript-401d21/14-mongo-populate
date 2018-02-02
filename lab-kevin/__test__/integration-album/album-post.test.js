'use strict';

const debug = require('debug')('http:Album-post-test');
const server = require('../../lib/server');
const superagent = require('superagent');
//require('jest');

describe('POST Integration', function() {
  beforeAll(() => server.start());
  afterAll(() => server.stop());

  debug('POST TEST');
  
  describe('Valid requests', () => {
    this.newAlbum = {
      title: 'Beachy',
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

    describe('POST /api/v1/image => create', () => {
      it('should post and create a new record', () => {
        debug('this.resPost.body', this.resPost.body);
        expect(this.resPost.body).not.toBeNull();
        expect(this.resPost.status).toEqual(201);
      });
    });

    describe('POST /api/v1/note => create', () => {
      it('should post and create a new record with values from sent data', () => {
        debug('this.resPost.body', this.resPost.body);
        expect(this.resPost.body.file_name).toEqual('KMP_010115_4257.jpg');
        expect(this.resPost.body.photographer).toEqual('Kevin Miller');
      });

      it('should should have id on the response body that is a valid mongo _id', () => {
        expect(this.resPost.body).toHaveProperty('_id');
        expect(this.resPost.body._id).toMatch(/^[0-9a-fA-F]{24}$/);
      });
    });

  });

  // describe('Inalid requests', () => {
  //   this.missingRequired = {
  //     'file_path': '/Users/driftabout/Pictures/MISC_PIC/KMP_010115_4257.jpg',
  //     'photographer': 'Kevin Miller',
  //     'title': 'Door',
  //     'description': 'large round metal door handles on double wood door' ,
  //     'location': 'Seattle, Wa',
  //   };

  //   beforeAll(()=> {
  //     return  superagent.post(':4000/api/v1/image')
  //       .send({})
  //       .catch(err => this.postErr = err);
  //   });

  //   beforeAll(()=> {
  //     return  superagent.post(':4000/api/v1/image')
  //       .send(this.missingRequired)
  //       .catch(err => this.requiredErr = err);
  //   });

  //   beforeAll(()=> {
  //     return  superagent.post(':4000/api/v1')
  //       .send(this.newImage)
  //       .catch(err => this.pathErr = err);
  //   });

  //   describe('POST /api/v1/image => create', () => {
  //     it('should return 404 for empty body', () => {
  //       expect(this.postErr.status).toEqual(400);
  //     });

  //     it('should return 404 for missing required field', () => {
  //       expect(this.requiredErr.status).toEqual(400);
  //     });

  //     it('should return 404 for post to a bad route', () => {
  //       expect(this.pathErr.status).toEqual(404);
  //     });
  //   });

  //});

});