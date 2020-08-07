const chai = require('chai');
const spies = require('chai-spies');

chai.use(spies);

const expect = chai.expect;

const ErrorUtils = require('../../src/utils/error.js');

describe('Error Utils', function () {

    afterEach(() => {
        chai.spy.restore(); // restores original methods
    });

    describe('#throwError(errorMessage)', function () {
        it('should display the error message and exit with non zero exit code', function () {
            // Spy on console.error() and process.exit() function to check they are called correctly
            const consoleSpy = chai.spy.on(console, 'error', function() { });
            const processSpy = chai.spy.on(process, 'exit', function() { });

            const crashMessage = 'Allah Akbar';
            ErrorUtils.throwError(crashMessage);

            expect(consoleSpy).to.have.been.called.with(crashMessage);
            expect(processSpy).to.have.been.called.with(1);
        });
    });
});