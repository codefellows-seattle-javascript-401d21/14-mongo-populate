'use strict';

const faker = require('faker');
const Band = require('../../model/band');
const Song = require('../../model/song');

const mock = module.exports = {};

// band Mocks - One, Many, RemoveAll
mock.band = {};

mock.band.createOne = () => new Band({ name: faker.hacker.adjective() }).save();

mock.band.createMany = n =>
    Promise.all(new Array(n).fill(0).map(mock.band.createOne));

mock.band.removeAll = () => Promise.all([Band.remove()]);


// Track Mocks - One, Many, RemoveAll
mock.song = {};

mock.song.createOne = () => {
    let result = {};

    return mock.band.createOne()
        .then(band => {
            result.band = band;
            return new Song({
                title: `${faker.name.firstName()} ${faker.name.lastName()}`,
                lyric: faker.hacker.ingverb(),
                band: band._id.toString(),
            }).save();
        })
        .then(song => result.song = song)
        .then(() => result);
};

mock.song.createMany = n => {
    let result = {};

    return mock.band.createOne()
        .then(band => {
            result.band = band;
            let songProms = new Array(n).fill(0).map(() => new Song({
                title: `${faker.name.firstName()} ${faker.name.lastName()}`,
                lyric: faker.hacker.ingverb(),
                band: band._id.toString(),
            }).save());
            return Promise.all(songProms);
        })
        .then(songs => result.songs = songs)
        .then(() => result);
};

mock.song.removeAll = () => Promise.all([Song.remove()]);