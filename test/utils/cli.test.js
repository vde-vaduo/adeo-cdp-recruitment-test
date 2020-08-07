const chai = require('chai');
const spies = require('chai-spies');

chai.use(spies);

const expect = chai.expect;

const CliUtils = require('../../src/utils/cli.js');
const ErrorUtils = require('../../src/utils/error.js');

describe('CLI Utils', function () {

    afterEach(() => {
        chai.spy.restore(); // restores original methods
    });

    describe('#displayData(data)', function () {
        it('should prettify the JSON, display it in the console and exit with code 0', function () {
            const fakeData = {
                bestPeopleInTheWorld: ['François Croiseau', 'Olivier Pierron'],
            };
            const prettyData = JSON.stringify(fakeData, null, 3);

            // Spy on console.log() and process.exit() function to check they are called correctly
            const consoleSpy = chai.spy.on(console, 'log', function() { });
            const processSpy = chai.spy.on(process, 'exit', function() { });

            CliUtils.displayData(fakeData);

            expect(consoleSpy).to.have.been.called.with(prettyData);
            expect(processSpy).to.have.been.called.with(0);
        });
    });

    describe('#throwWrongUsageError()', function () {
        it('should fetch the countries from the data file and return it', function () {
            // Spy on ErrorUtils function to check it's called correctly
            const errorSpy = chai.spy.on(ErrorUtils, 'throwError', function() { });
            const errorMessage = 'Wrong usage of this script. Check README.md to get how to use it';

            CliUtils.throwWrongUsageError();

            expect(errorSpy).to.have.been.called.with(errorMessage);
        });
    });

    describe('#parseCliArguments()', function () {
        const baseNodeArgs = ['node', 'app.js'];
        const correctArgs = ['--filter=foo', '--count'];

        it('should accept correct cli arguments', function () {
            // Test all args
            process.argv = baseNodeArgs.concat(correctArgs);
            const cliArgs = CliUtils.parseCliArguments();
            expect(cliArgs).to.eql(correctArgs);

            // Test only filter
            process.argv = baseNodeArgs.concat(correctArgs[0]);
            const filterArgs = CliUtils.parseCliArguments();
            expect(filterArgs).to.eql([correctArgs[0]]);

            // Test only count
            process.argv = baseNodeArgs.concat(correctArgs[1]);
            const countArgs = CliUtils.parseCliArguments();
            expect(countArgs).to.eql([correctArgs[1]]);
        });

        it('should throw when an argument is not correct', function () {
            // Spy on function to check it's called correctly
            const errorSpy = chai.spy.on(ErrorUtils, 'throwError', function() { });

            // Test no arg
            process.argv = [];
            CliUtils.parseCliArguments();
            expect(errorSpy).to.have.been.called();

            // Test wrong arg
            process.argv = baseNodeArgs.concat(correctArgs.concat(['abc']));
            CliUtils.parseCliArguments();
            expect(errorSpy).to.have.been.called();

            // Test typo
            process.argv = baseNodeArgs.concat(['--countoto']);
            CliUtils.parseCliArguments();
            expect(errorSpy).to.have.been.called();

            // Test no equal on filter
            process.argv = baseNodeArgs.concat(['--filterfoo']);
            CliUtils.parseCliArguments();
            expect(errorSpy).to.have.been.called();

            // Test equal on count
            process.argv = baseNodeArgs.concat(['--count=42']);
            CliUtils.parseCliArguments();
            expect(errorSpy).to.have.been.called();
        });
    });

    describe('#getFilter(cliArgument)', function () {
        it('should get the filter out of the command line argument', function () {
            const cliArg = '--filter=foo';
            const filter = CliUtils.getFilter(cliArg);

            expect(filter).to.equal('foo');
        });

        it('should throw when no value is provided', function () {
            // Spy on function to check it's called correctly
            const errorSpy = chai.spy.on(ErrorUtils, 'throwError', function() { });

            // Test no arg
            CliUtils.getFilter('--filter=');
            expect(errorSpy).to.have.been.called();

            // Test empty arg
            CliUtils.getFilter('--filter=""');
            expect(errorSpy).to.have.been.called();
        });
    });
});