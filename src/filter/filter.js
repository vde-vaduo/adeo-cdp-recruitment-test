// Entry file for filtering function

const DataUtils = require('../utils/data.js');
const ErrorUtils = require('../utils/error.js');
const CliUtils = require('../utils/cli.js');

/**
 * Filter the animals
 * @param filterText: the filter passed in the CLI
 */
function filter(filterText) {
    // Get countries from data file
    const countries = DataUtils.getCountries();

    // Filter countries
    const filteredCountries = countries.filter(country => {
        // Filter people
        const filteredPeople = country.people.filter(person => {
            // Filter animals by checking their name contains the filter text
            const filteredAnimals = person.animals.filter(animal => animal.name.indexOf(filterText) > 0);

            // We return only the filtered animals
            person.animals = filteredAnimals;

            // We include the person only if he has at least an animal that matches the search text
            return filteredAnimals.length > 0;
        });

        // We return only the filtered people
        country.people = filteredPeople;

        // We include the country only if it has at least a person that has an animal with a name containing the filter
        return filteredPeople.length > 0;
    });

    // Check the filter returned something
    if (filteredCountries.length === 0) {
        ErrorUtils.throwError('[NOT_FOUND] 404: no puppy found with this name :\'(')
    }

    CliUtils.displayData(filteredCountries);
}

module.exports = {
    filter,
};
