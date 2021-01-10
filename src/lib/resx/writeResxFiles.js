const fs = require("fs");
const { renderResxTemplate } = require("./resx-template");
const { writeFile, writeFiles } = require("../file-io/writeFiles");

async function writeResxFile(file) {
    return writeFile(file, renderResxTemplate);
}
exports.writeResxFile = writeResxFile;

async function writeResxFiles(files) {
    return await writeFiles(files, renderResxTemplate)
}
exports.writeResxFiles = writeResxFiles;
