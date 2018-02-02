'use strict';

const debug = require('debug')('http:image-get-test');
const server = require('../../lib/server');
const superagent = require('superagent');
require('jest');

describe('Image GET Integration', function() {
  beforeAll(() => server.start());
  afterAll(() => server.stop());
  
  describe('Valid requests', () => {

    this.newImage = {
      file_path: '/Users/driftabout/Pictures/MISC_PIC/KMP_010115_4257.jpg',
      photographer: 'Kevin Miller',
      title: 'Door',
      description: 'large round metal door handles on double wood door' ,
      location: 'Seattle, Wa',
      album: '5a73c6b669a8cb69eaafbe10',
    };

    beforeAll(()=> {
      return  superagent.post(':4000/api/v1/image')
        .send(this.newImage)
        .then( res => {
          this.resPost = res;
          return;
        })
        .catch(err => {
          debug('superagent error ', err);
        });
    });

    describe('GET /api/v1/image/someid =>', () => {
    
      beforeAll(() => {
        debug('this.resPost.body._id', this.resPost.body._id);
        return superagent.get(`:4000/api/v1/image/${this.resPost.body._id}`)
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

      it('should contain an object that contains the object that was used to create', () => {
        expect(this.getOne.body).toEqual(expect.objectContaining(this.newImage));
      });

    });

    // describe('GET /api/v1/image => All', () => {
      
    //   beforeAll(() => {
    //     return superagent.get(':4000/api/v1/image')
    //       .then(res => this.getAll = res);       
    //   });

    //   it('should contain id of post in array', () => {
    //     debug('this.getAll.body', Array.isArray(this.getAll.body));
    //     debug('this.getAll.text', this.getAll.text);
    //     expect(this.getAll.body).toEqual(expect.arrayContaining([this.resPost.body._id]));
        
    //   });
    //   it('should return status code 200', () => {
    //     expect(this.getAll.status).toEqual(200);
    //   });

    //   it('should return an array of ids', () => {
    //     expect(this.getAll.body.every(id => id.match(/^[0-9a-fA-F]{24}$/))).toBe(true);
    //   });
      
    // });
  
  });

  // describe('Invalid requests', () => {
  //   beforeAll(() => {
  //     return superagent.get(':4000/api/v1/image/749363490365a940f8593e957f836c3')
  //       .catch(err => this.getErr = err);       
  //   });

  //   it('should return a 404 error for an id that is bad...', () => {
  //     expect(this.getErr.status).toBe(400);
  //   });

  //   beforeAll(() => {
  //     return superagent.get(`:4000/api/v1/${this.resPost.body._id}`)
  //       .catch(err => this.missingErr = err);       
  //   });

  //   it('should return status 404 for a GET request to a bad path', () => {
  //     debug('this.deleteGeterr.status', this.getErr.status);
  //     expect(this.missingErr.status).toEqual(404);
  //   });
    
  //   beforeAll(() => {
  //     return superagent.delete(`:4000/api/v1/image/${this.resPost.body._id}`)
  //       .then(res => this.deleteRes = res);       
  //   });
  //   beforeAll(() => {
  //     return superagent.get(`:4000/api/v1/image/${this.resPost.body._id}`)
  //       .catch(err => this.missingErr = err);       
  //   });

  //   it('should return status 404 if an id is not in the database', () => {
  //     debug('this.deleteGeterr.status', this.getErr.status);
  //     expect(this.missingErr.status).toEqual(404);
  //   });


  // });

});