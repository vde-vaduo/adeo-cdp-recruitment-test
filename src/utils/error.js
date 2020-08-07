// This Utils file provides functions to handle project errors

/**
 * Shows an error message in the standard output and exits the process
 * @param errorMessage: the error message displayed in the output
 */
function throwError(errorMessage) {
    console.error(errorMessage);
    process.exit(1);
}

module.exports = {
    throwError,
};
