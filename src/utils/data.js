// This Utils file provides functions to help managing the data file

const ErrorUtils = require('../utils/error.js');

/**
 * Get the countries from the data file
 * @returns countries: list of countries
 */
function getCountries() {
    // Read the data file
    const countries = require('../../data/data.js');

    // Check the data is correct and not empty
    if (countries == null || countries.data == null || countries.data.length === 0) {
        ErrorUtils.throwError('No data provided or the data format has changed, fix it and try again.');
    }

    // return the countries
    return countries.data;
}

module.exports = {
    getCountries,
};
