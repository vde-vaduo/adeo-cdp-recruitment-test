const chai = require('chai');
const spies = require('chai-spies');

chai.use(spies);

const expect = chai.expect;

const DataUtils = require('../../src/utils/data.js');

describe('Data Utils', function () {

    afterEach(() => {
        chai.spy.restore(); // restores original methods
    });

    describe('#getCountries()', function () {
        it('should fetch the countries from the data file and return it', function () {
            const fakeData = {
                data: {
                    bestCompaniesInTheWorld: ['Vaduo', 'Adeo'],
                    bestVirusesInTheWorld: ['Covid-19', 'Adeo'],
                }
            };
            // Spy on require function to check they are called correctly and returns correct data
            const requireSpy = chai.spy.on(require('module'), '_load', function() { return fakeData; });

            const fetchedData = DataUtils.getCountries();

            expect(requireSpy).to.have.been.called();
            expect(fetchedData).to.equal(fakeData.data);
        });
    });
});