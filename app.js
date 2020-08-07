/*
    Hello guys !
    Welcome to my code.
    You might be there to destroy me, this won't be the most beautiful code you've ever seen, but nor the worst one (I hope !)
    So have a coffee, relax, and enjoy your trip on what has come to my mind when solving your exercise ;)

    Please note that I forced myself to stay focused on the exercise scope to not overcomplicate things
        For example I adapted my code to the data provided by taking in account that there is not a lot of it,
            my code would be very different if we were working with a huge amount of data.
 */

const CliUtils = require('./src/utils/cli.js');
const DataUtils = require('./src/utils/data.js');
const DataFilter = require('./src/filter/filter.js');
const DataCounter = require('./src/count/count.js');

// Get CLI arguments // sad we cannot use a npm module :'(
const cliArgs = CliUtils.parseCliArguments();

// Read data from file
let countries = DataUtils.getCountries();

// Check if the filter argument is given
const filterArg = cliArgs.filter(arg => arg.indexOf('--filter') > -1)[0];

// Check if the count argument is given
const countArg = cliArgs.indexOf('--count') > -1;

// Should we filter ?
if (filterArg != null) {
    // Get and check the filtering text
    const filterText = CliUtils.getFilter(filterArg);

    // Filter the array of countries and eventually count (you don't want to do it separately, performances!)
    countries = DataFilter.filterCountries(countries, filterText, countArg);
} else if (cliArgs.indexOf('--count') > -1) { // Only count
    // Count everything
    countries = DataCounter.countCountries(countries);
}

// Display the countries in the console
CliUtils.displayData(countries);
