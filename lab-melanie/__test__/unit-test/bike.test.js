'use strict';

const Bike = require('../../model/bike.js');
require('jest');

describe('Bike Module', function() {
  let newBike = new Bike();
  describe('Bike schema', () => {
    it('should create a object', () => {
      expect(newBike).toBeInstanceOf(Object);
    });
  });
});