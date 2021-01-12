const tsTemplate = require("./src/lib/ts-enum/ts-template.js");
const writeTsEnumFile = require("./src/lib/ts-enum/writeTsEnumFile.js");
const writeFiles = require("./src/lib/file-io/writeFiles.js");
const readCsvFile = require("./src/lib/file-io/readCsvFile.js");
const generateFiles = require("./src/generateFiles.js");
const resxTemplate = require("./src/lib/resx/resx-template.js");
const writeResxFiles = require("./src/lib/resx/writeResxFiles.js");
const makeCsvTemplateFile = require("./src/makeCsvTemplateFile.js");
const writeRowsToJsArrayFile = require("./src/lib/rows-to-ts-array/writeRowsToTsArrayFile.js");

module.exports = {
    ...makeCsvTemplateFile,
    ...generateFiles,
    ...readCsvFile,
    ...writeFiles,
    ...resxTemplate,
    ...writeResxFiles,
    ...writeRowsToJsArrayFile,
    ...tsTemplate,
    ...writeTsEnumFile,
};
