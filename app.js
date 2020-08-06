/*
    Hello guys !
    Welcome to my code.
    You might be there to destroy me, this won't be the most beautiful code you've ever seen, but nor the worst one (I hope !)
    So have a coffee, relax, and enjoy your trip on what has come to my mind when solving your exercise ;)
 */

const CliUtils = require('./src/utils/cli.js');

// Get CLI argument // sad we cannot use a npm module :'(
const cliArg = CliUtils.getArgument()

// Check arg to determine which function to call
if (cliArg.indexOf('--filter') > -1 && cliArg.indexOf('=') > -1) {
    // Get and check the filtering string
    const filter = CliUtils.getFilter(cliArg);

    // Let's filter !
    console.log('Go filter !', filter);
} else if (cliArg === '--count') {
    // Let's count !
    console.log('Go count !');
} else {
    CliUtils.throwWrongUsageError();
}
