# adeo-cdp-recruitment-test by VDE (Node.js)

## Context
This command-line interface aims at filtering a list of elements.
In the file `data/data.js`, there are `Countries` containing `Peoples` containing `Animals`.

You can use this script to filter this data by Animal name.

## Usage
Filter by animal name
```bash
$ node app.js --filter=ry
$ node app.js --filter="an El"
```

You can count the number of children of each parent:
```bash
$ node app.js --filter=le --count
$ node app.js --filter="a T" --count
```

Only count the children without filtering:
```bash
$ node app.js --count
```

## Test
You must firstly install all dependencies
```bash
$ npm install
```
Run all the unit tests
```bash
$ npm run test
```
Test coverage
```bash
$ npm run coverage
```