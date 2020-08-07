// Entry file for counting function

/**
 * Count the children for every country
 * @param countries: array of countries to filter
 * @returns {*}: the array of countries with updated names
 */
function countCountries(countries) {
    for (let i = 0; i < countries.length; i++) {
        const country = countries[i];
        const people = country.people;
        country.name = countChildren(country, 'people');

        for (let j = 0; j < people.length; j++) {
            const person = people[j];
            person.name = countChildren(person, 'animals');
        }
    }

    return countries;
}

/**
 * Return the name of the parent adding the number of children it contains
 * @param parent: parent object with its name and children
 * @param childName: the children property name we have to count
 * @returns {string}: the updated name of the parent with the count
 */
function countChildren(parent, childName) {
    return parent.name + ' [' + parent[childName].length + ']';
}

module.exports = {
    countCountries,
    countChildren,
}
