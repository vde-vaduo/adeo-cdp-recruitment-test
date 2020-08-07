// This Utils file provides functions to help getting and checking the multiple arguments that might be passed to the node.js script

const ErrorUtils = require('./error.js');

// List of command lines options, with 'hasValue' option (meaning it must be like --filter=foo if true)
const cliOptions = [
    {
        name: '--filter',
        hasValue: true,
    },
    {
        name: '--count',
        hasValue: false,
    },
]

/**
 * Prettify the data and display it in the console
 * @param data
 */
function displayData(data) {
    // Prettify the JSON in order to output it in the console
    const prettyJson = JSON.stringify(data, null, 3);

    // Display it in the console
    console.log(prettyJson);
    process.exit(0);
}

/**
 * Throws an error when the usage of the script is wrong (e.g. by providing no argument, or too much)
 */
function throwWrongUsageError() {
    ErrorUtils.throwError('Wrong usage of this script. Check README.md to get how to use it');
}

/**
 * Check the command line arguments and return them
 * @returns {string[]}: the command line arguments
 */
function parseCliArguments() {
    // Read node cli args
    const cliArgs = process.argv.slice(2);

    // Check arguments are valid
    if (cliArgs.length === 0 || !cliArgs.every(arg => {
        // For every argument passed in the cli, it must match with at least one of the allowed options defined in cliOptions
        return cliOptions.some(allowedArg => {
            let argName;
            if (allowedArg.hasValue) {
                // Must be formatted like --argument=value
                argName = arg.split('=')[0]
            } else {
                argName = arg;
            }

            return argName != null && argName === allowedArg.name;
        });
    })) {
        throwWrongUsageError();
    }

    // Return the arguments
    return cliArgs;
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
    parseCliArguments,
    getFilter,
    displayData,
    throwWrongUsageError,
};
