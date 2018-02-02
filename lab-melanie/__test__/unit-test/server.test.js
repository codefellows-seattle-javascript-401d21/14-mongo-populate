'use strict';

const server = require('../../lib/server.js');
require('jest');

describe('Server Module', function() {
  beforeAll(server.start);
  afterAll(server.stop);

  it('should return a promise rejction if the server is already running when started', () => {
    server.start();
    server.start()
      .catch(err => expect(err).toBeInstanceOf(Error));
    server.stop();
  });
  });
  // it('should return a promise rejection if the server is stopped when stopped')
});