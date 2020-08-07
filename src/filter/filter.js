// Entry file for filtering function

const ErrorUtils = require('../utils/error.js');
const Counter = require('../count/count.js');

/**
 * Filter the data
 * @param countries: array of countries to filter
 * @param filterText: the filter passed in the CLI
 * @param count: boolean to count the children or not
 * @returns {*}: the filtered array of countries
 */
function filterCountries(countries, filterText, count) {
    // Filter countries
    const filteredCountries = countries.filter(country => {
        // Filter people
        const filteredPeople = country.people.filter(person => {
            // Filter animals by checking their name contains the filter text
            // I stated that the filtering part should be case sensitive (it's about names, not words).
            const filteredAnimals = person.animals.filter(animal => animal.name.indexOf(filterText) > 0);

            // We return only the filtered animals
            person.animals = filteredAnimals;

            // Count animals if we have to
            person.name = count ? Counter.countChildren(person, 'animals') : person.name;

            // We include the person only if he has at least an animal that matches the search text
            return filteredAnimals.length > 0;
        });

        // We return only the filtered people
        country.people = filteredPeople;

        // Count people if we have to
        country.name = count ? Counter.countChildren(country, 'people') : country.name;

        // We include the country only if it has at least a person that has an animal with a name containing the filter
        return filteredPeople.length > 0;
    });

    // Check the filter returned something
    if (filteredCountries.length === 0) {
        ErrorUtils.throwError('[NOT_FOUND] 404: no puppy found with this name :\'(')
    }

    return filteredCountries;
}

module.exports = {
    filterCountries,
};
