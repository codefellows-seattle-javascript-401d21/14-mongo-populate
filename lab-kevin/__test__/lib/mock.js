'use strict';

const faker = require('faker');
const Album = require('../../model/album');
const Image = require('../../model/image');

const mock = module.exports = {};

// Album Mocks - One, Many, RemoveAll
mock.album = {};

mock.album.createOne = () => new Album({ title: faker.hacker.adjective() }).save();

mock.album.createMany = n =>
  Promise.all(new Array(n).fill(0).map(mock.album.createOne));

mock.album.removeAll = () => Promise.all([Album.remove()]);


// Track Mocks - One, Many, RemoveAll
mock.image = {}

mock.image.createOne = () => {
  let result = {};

  return mock.image.createOne()
    .then(album => {
      result.album = album;
      return new Image({
        file_path: faker.image.imageUrl(),
        photographer: faker.name.findName(),
        title: faker.hacker.adjective(),
        description: faker.hacker.phrase(),
        album: this.album._id,
      }).save();
    })
    .then(image => result.image = image)
    .then(() => result);
};

mock.image.createMany = n => {
  let result = {};

  return mock.album.createOne()
    .then(album => {
      result.album = album;
      let imageProms = new Array(n).fill(0).map(() => new Image({
        file_path: faker.image.imageUrl(),
        photographer: faker.name.findName(),
        title: faker.hacker.adjective(),
        description: faker.hacker.phrase(),
        album: this.album._id,
      }).save());
      return Promise.all(imageProms);
    })
    .then(images => result.images = images)
    .then(() => result);
};

mock.image.removeAll = () => Promise.all([Image.remove()]);