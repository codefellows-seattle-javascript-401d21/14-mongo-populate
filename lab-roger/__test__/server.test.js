'use strict';

let server = require('../lib/server');
require('jest');

describe('Server Control Tests', () => {
  describe('Server Start and check that it is Running', () => {
    it('should check that server.isOn returns true', () => {
      return server.start()
        .then(() => {
          expect(server.isOn).toBe(true);

        });

    });
  });
  describe('Server Close When Not Running', () => {
    it('should return fale to server.isOn if it is not running', () => {
      return server.stop()
        .then(() => expect(server.isOn).toBe(false));
    });
  });
});
