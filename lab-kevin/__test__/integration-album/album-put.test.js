'use strict';

const debug = require('debug')('http:Album-put-test');
const server = require('../../lib/server');
const superagent = require('superagent');
require('jest');

describe('Album PUT Integration', function() {
  beforeAll(() => server.start());
  afterAll(() => server.stop());
  
  describe('Valid requests', () => {

    this.newAlbum = {
      title: 'Beachy',
    };

    this.updateAlbum = {
      'title': 'Sugar Plum Dancing',
    };

    beforeAll(()=> {
      return  superagent.post(':4000/api/v1/album')
        .send(this.newAlbum)
        .then( res => {
          this.resPost = res;
        })
        .catch(err => {
          debug('superagent error ', err);
        });
    });

    describe('PUT /api/v1/image/someid => update', () => {
      beforeAll(() => {
        return superagent.put(`:4000/api/v1/album/${this.resPost.body._id}`)
          .send(this.updateAlbum)
          .then(res => this.put = res);       
      });
      beforeAll(() => {
        return superagent.get(`:4000/api/v1/album/${this.resPost.body._id}`)
          .then(res => this.putGet = res);       
      });

      it('should subject should be new', () => {
        // debug('this.putGet.body', this.putGet.body);
        let body = JSON.parse(this.putGet.text);
        expect(body.title).toEqual(this.updateAlbum.title);
      });

      it(' should be new', () => {
        let body = JSON.parse(this.putGet.text);
        expect(body.title).not.toEqual(this.putGet.title);
      });
      it('should return status code 204', () => {
        expect(this.put.status).toEqual(204);
      });
    });

  
  });



  // describe('Invalid requests', () => {

  //   describe('PUT /api/v1/image/someid => update', () => {
  //     beforeAll(() => {
  //       return superagent.put(':4000/api/v1/image/489736983F2939A938489E9W348C')
  //         .send(this.updateImage)
  //         .catch(err => this.putErr = err );    
  //     });

  //     it('should return status code 400 for an update with a bad id', () => {
  //       expect(this.putErr.status).toEqual(400);
  //     });

  //     beforeAll(() => {
  //       return superagent.put(`:4000/api/v1/${this.resPost.body._id}`)
  //         //.send({subject: 'clouds'})
  //         .send(this.newImage)
  //         .catch(err => this.putEmpty = err );    
  //     });

  //     it('should return status code 5404 for bad path', () => {
  //       expect(this.putEmpty.status).toEqual(404);
  //     });
  //   }); 
  // });
});