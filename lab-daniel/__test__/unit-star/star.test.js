'use strict';

let Star = require('../../model/star');
require('jest');

let testStar = new Star({ starName: 'test star model'});


describe('Star Constructor Unit Tests', () => {
  describe('Valid input testing', () => {
    it('Should return a valid star object when provided valid inputs', () => {
      expect(testStar).toBeInstanceOf(Star);
    });
    it('Should return an object with the correct properties', () => {
      expect(testStar).toHaveProperty('_id');
    });
    it('The object returned should have the correct information passed in as the values of the properties', () => {
      expect(testStar.starName).toBe('test star model');
    });
  });
  describe('Invalid input testing', () => {
    it('should throw an error if not provided with valid input', () => {
      expect(() => {
        let badStar = new Star({});
        console.log(badStar);        
      }).toThrow();
    });
  });
});