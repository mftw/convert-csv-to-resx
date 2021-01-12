const { writeFile } = require("./lib/file-io/writeFiles");

async function makeCsvTemplateFile(fileName = "./CSVTemplateFile.csv", content = "Name;Comment\n") {
    const file = {
        fileName,
        stringsToFile: [],
    };
    return writeFile(file, () => content, "utf-8", { addBOM: true });
}
exports.makeCsvTemplateFile = makeCsvTemplateFile;
