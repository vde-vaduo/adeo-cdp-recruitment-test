/*
    Hello guys !
    Welcome to my code.
    You might be there to destroy me, this won't be the most beautiful code you've ever seen, but nor the worst one (I hope !)
    So have a coffee, relax, and enjoy your trip on what has come to my mind when solving your exercise ;)

    Please note that I forced myself to stay focused on the exercise scope to not overcomplicate things
        For example I didn't manage multiple CLI argument (we could imagine $ node app.js --filter=foo --count and do both, but it's not required)
        I also adapted my code to the data provided by taking in account that there is not a lot of it,
            my code would be very different if we were working with a huge amount of data.
 */

const CliUtils = require('./src/utils/cli.js');
const DataFilter = require('./src/filter/filter.js');

// Get CLI argument // sad we cannot use a npm module :'(
const cliArg = CliUtils.getArgument()

// Check arg to determine which function to call
if (cliArg.indexOf('--filter') > -1 && cliArg.indexOf('=') > -1) {
    // Get and check the filtering string
    const filterText = CliUtils.getFilter(cliArg);

    // Let's filter !
    DataFilter.filter(filterText);
} else if (cliArg === '--count') {
    // Let's count !
    console.log('Go count !');
} else {
    CliUtils.throwWrongUsageError();
}
