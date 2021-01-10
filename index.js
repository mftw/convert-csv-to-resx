const tsTemplate = require("./src/lib/ts-enum/ts-template.js");
const writeTsEnumFile = require("./src/lib/ts-enum/writeTsEnumFile.js");
const writeFiles = require("./src/lib/file-io/writeFiles.js");
const readCsvFile = require("./src/lib/file-io/readCsvFile.js");
const resxTemplate = require("./src/lib/resx/resx-template.js");
const writeResxFiles = require("./src/lib/resx/writeResxFiles.js");
const generateFilesImport = require("./src/generateFiles.js");
const writeRowsToJsArrayFile = require("./src/lib/rows-to-js-array/writeRowsToJsArrayFile.js");
const makeCsvTemplateFileImport = require("./src/makeCsvTemplateFile.js");

module.exports = {
    ...makeCsvTemplateFileImport,
    ...generateFilesImport,
    ...readCsvFile,
    ...writeFiles,
    ...resxTemplate,
    ...writeResxFiles,
    ...writeRowsToJsArrayFile,
    ...tsTemplate,
    ...writeTsEnumFile,
};
