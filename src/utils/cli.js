// This Utils file provides functions to help getting and checking the multiple arguments that might be passed to the node.js script

const ErrorUtils = require('./error.js');

/**
 * Throws an error when the usage of the script is wrong (e.g. by providing no argument, or too much)
 */
function throwWrongUsageError() {
    ErrorUtils.throwError('Wrong usage of this script. Check README.md to get how to use it');
}

/**
 * Checks there is one and only one command line argument and returns it (e.g. --filter)
 * @returns {string}: the command line argument
 */
function getArgument() {
    // Read node cli args
    const cliArgs = process.argv.slice(2);

    // Handle empty args
    if (cliArgs.length !== 1) { // Zero or multiple argument(s)
        throwWrongUsageError();
    }

    // Return the first and only argument we handle in this script
    return cliArgs[0];
}

/**
 * Gets the filter string from the cli argument
 * @param cliArgument: The command line argument passed to the script (should be like --filter=foo)
 * @returns {string}: the filter (e.g. 'foo')
 */
function getFilter(cliArgument) {
    const filter = cliArgument.substr(cliArgument.indexOf('=') + 1);

    if (filter == null || filter.length === 0) { // Filter null or empty
        throwWrongUsageError();
    }

    return filter;
}

module.exports = {
    throwWrongUsageError,
    getArgument,
    getFilter,
};
