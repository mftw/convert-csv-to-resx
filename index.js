const fs = require("fs");
const tsTemplate = require("./src/lib/ts-enum/ts-template.js");
const writeTsEnumFile = require("./src/lib/ts-enum/writeTsEnumFile.js");
const writeFiles = require("./src/lib/file-io/writeFiles.js");
const readCsvFile = require("./src/lib/file-io/readCsvFile.js");
const resxTemplate = require("./src/lib/resx/resx-template.js");
const writeResxFiles = require("./src/lib/resx/writeResxFiles.js");
const generateFilesImport = require("./src/generateFiles.js");
const writeRowsToJsArrayFile = require("./src/lib/rows-to-js-array/writeRowsToJsArrayFile.js");
const makeCsvTemplateFileImport = require("./src/makeCsvTemplateFile.js");

const [_, dir, ...args] = process.argv;
const cmdArgs = require("minimist")(args, { "--": true }, { boolean: true }, { string: true });

const shouldGenerateTemplate = cmdArgs["generate-template"];

const inputFileName =
    cmdArgs["inputFile"] ||
    (typeof cmdArgs._[0] === "string" && cmdArgs._[0].toLowerCase().includes(".csv") && cmdArgs._[0]);

console.log("🚀 ~ file: index.js ~ line 19 ~ inputFileName", inputFileName);
if (shouldGenerateTemplate) {
    const templateName =
        typeof shouldGenerateTemplate === "string" && shouldGenerateTemplate.length > 0
            ? `./${shouldGenerateTemplate}.csv`
            : "./CSVTemplateFile.csv";
    const { makeCsvTemplateFile } = makeCsvTemplateFileImport;
    makeCsvTemplateFile(templateName).then(() => {
        console.log("[DONE] Written '" + templateName + "' with UTF-8-BOM encoding");
    });
} else {
    if (fs.existsSync(inputFileName)) {
        const projectName =
            cmdArgs["projectName"] || (typeof cmdArgs._[1] === "string" && cmdArgs._[1].length > 0)
                ? cmdArgs._[1]
                : inputFileName.slice(0, inputFileName.lastIndexOf("."));
        const { generateFiles } = generateFilesImport;
        generateFiles(inputFileName, projectName);
    } else {
        if (!inputFileName) {
            console.log("[ERROR] Please provide a .csv file");
        } else {
            console.log("[ERROR] File: '" + inputFileName + "' not found");
        }
    }
}

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
