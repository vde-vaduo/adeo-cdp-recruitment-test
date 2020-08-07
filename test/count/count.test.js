const chai = require('chai');

const expect = chai.expect;

const DataCounter = require('../../src/count/count.js');

describe('Count entry file', function () {
    const fakeData = [
        {
            name: 'Congo',
            people: [
                {
                    name: 'Kim Jong-un',
                    animals: [
                        {
                            name: 'Beethoven',
                        },
                        {
                            name: 'Garfield',
                        },
                    ],
                },
            ],
        },
    ];

    describe('#countCountries(countries)', function () {
        it('should count the number of children of a whole data set', function () {
            // Data as it should be after getting counted
            const countedData = [
                {
                    name: 'Congo [1]',
                    people: [
                        {
                            name: 'Kim Jong-un [2]',
                            animals: [
                                {
                                    name: 'Beethoven',
                                },
                                {
                                    name: 'Garfield',
                                },
                            ],
                        },
                    ],
                },
            ];

            const result = DataCounter.countCountries(fakeData);

            expect(result).to.eql(countedData);
        });
    });

    describe('#countChildren(parent, childName)', function () {
        it('should count the number of children for a parent and return the name', function () {
            const fakeParent = {
                name: 'Super Nanny',
                slaves: [
                    {
                        name: 'Cleopatra',
                    },
                    {
                        name: 'James Bond',
                    },
                ],
            };
            const parentName = 'Super Nanny [2]';

            const result = DataCounter.countChildren(fakeParent, 'slaves');

            expect(result).to.eql(parentName);
        });
    });
});