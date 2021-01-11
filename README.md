# Convert-csv-to-resx

Generate .resx files from a .csv file

## Requirements

-   NodeJS >=14.15

# Quick guide

A .csv file is needed to convert from.

## Template CSV file

Open a terminal in the folder you wish to have the template file in, and type:

```
npx csv-to-resx --generate-template
```

This will produce `CSVTemplateFile.csv` which you should rename to your project name e.g. `SuperApp.csv`.

Now open the file in e.g. Excel and translate away.

## Converting from CSV file

Open a terminal in the folder containing the .csv file and type:

```
npx csv-to-resx <FileName>.csv
``` 
where \<FileName> is the name of the .csv file to convert.


# Development
Tbc..

```javascript
const { generateFiles, makeCsvTemplateFile } = require("csv-to-resx");

const projectName = "Translate";
const testFilename = projectName + ".csv";
const csvFile = await makeCsvTemplateFile(
    testFilename,
    "Name;Comment;0990_n-A;9999_no-where\n" +
    "test-case1;auto generated test file 🍔;this is test case 1;lorem ipsum...\n" +
    // More rows here...
)
const files = await generateFiles(testFilename, { projectName, silent: true });
```
