const chai = require('chai');
const spies = require('chai-spies');

chai.use(spies);

const expect = chai.expect;

const DataFilter = require('../../src/filter/filter.js');
const ErrorUtils = require('../../src/utils/error.js');

describe('Filter entry file', function () {

    afterEach(() => {
        chai.spy.restore(); // restores original methods
    });

    describe('#filterCountries(countries, filterText, count)', function () {
        const fakeData = [
            {
                name: 'China',
                people: [
                    {
                        name: 'Luc Skywalker',
                        animals: [
                            {
                                name: 'Dumbo',
                            },
                        ],
                    },
                    {
                        name: 'Mylene Farmer',
                        animals: [
                            {
                                name: 'Nessie',
                            },
                        ],
                    },
                ],
            },
            {
                name: 'Korea',
                people: [
                    {
                        name: 'Donald Trump',
                        animals: [
                            {
                                name: 'Donald Duck',
                            },
                            {
                                name: 'Didier Bourdon',
                            },
                        ],
                    },
                    {
                        name: 'Marie Curie',
                        animals: [
                            {
                                name: 'ET',
                            },
                        ],
                    },
                ],
            },
        ];

        it('should filter the countries and people by their animal name', function () {
            // Data as it should be after getting filtered by "ld Du"
            const filteredFakeData = [
                {
                    name: 'Korea',
                    people: [
                        {
                            name: 'Donald Trump',
                            animals: [
                                {
                                    name: 'Donald Duck',
                                },
                            ],
                        },
                    ],
                },
            ];

            const filteredData = DataFilter.filterCountries(fakeData, 'ld Du', false);

            expect(filteredData).to.eql(filteredFakeData);
        });

        it('should filter and count the number of children', function () {
            // Data as it should be after getting filtered by "D"
            const filteredCountedData = [
                {
                    name: 'China [1]',
                    people: [
                        {
                            name: 'Luc Skywalker [1]',
                            animals: [
                                {
                                    name: 'Dumbo',
                                },
                            ],
                        },
                    ],
                },
                {
                    name: 'Korea [1]',
                    people: [
                        {
                            name: 'Donald Trump [2]',
                            animals: [
                                {
                                    name: 'Donald Duck',
                                },
                                {
                                    name: 'Didier Bourdon',
                                },
                            ],
                        },
                    ],
                },
            ];

            const filteredData = DataFilter.filterCountries(fakeData, 'D', true);

            expect(filteredData).to.eql(filteredCountedData);
        });

        it('should throw an error when the filter matches no data', function () {
            // Spy on ErrorUtils function to check it's called correctly
            const errorSpy = chai.spy.on(ErrorUtils, 'throwError', function() { });

            DataFilter.filterCountries(fakeData, 'abcdef', false);

            expect(errorSpy).to.have.been.called();
        });
    });
});