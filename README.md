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

You can skip the renaming and generate the file with the correct name at once:
```
npx csv-to-resx --generate-template <ProjectName>
```
Where \<ProjectName> is the name you want to give the file.

Now open the file in e.g. Excel and translate away.

## Converting from CSV file

Open a terminal in the folder containing the .csv file and type:

```
npx csv-to-resx <FileName>.csv
``` 
Where \<FileName> is the name of the .csv file to convert.


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

## Encoding
The .csv file gets `UTF-8-BOM` which forces MS Excel to respect character encoding.

Other files gets standard `UTF-8`.

## Line endings
All files is generated with CRLF (Windows) line endings.
