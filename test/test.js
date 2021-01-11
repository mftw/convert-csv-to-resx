const fs = require("fs");
const { generateFiles } = require("../src/generateFiles");
const { makeCsvTemplateFile } = require("../src/makeCsvTemplateFile");

(async () => {
    const startTime = Date.now();
    let fileWriteErrors = [];
    let files = [];
    let generelError = null;
    const deleteFilesAfterTest = false;
    try {
        const projectName = "Translate";
        const testFilename = projectName + ".csv";
        const csvFile = await makeCsvTemplateFile(
            testFilename,
            /******/ "Name;Comment;0990_n-A;9999_no-where\n" +
                /**/ "test-case1;auto generated test file;this is test case 1;lorem ipsum...\n" +
                /**/ "rød-ræve-båd;tester dansk;testing danish;helt væk 🍔\n",
        );
        console.log("[TEST] generated ", testFilename, "Time:", Date.now() - startTime + "ms");
        const startTimeGenerateFiles = Date.now();
        files = await generateFiles(testFilename, { projectName, silent: true });
        const endTimeGenerateFiles = Date.now() - startTimeGenerateFiles + "ms";
        files.push(csvFile);
        console.log("[TEST] genereted " + files.length + " files. Time:", endTimeGenerateFiles);
        fileWriteErrors = files.filter((file) => Boolean(file.error));
    } catch (err) {
        console.error("[TEST] ERROR", err);
        generelError = err
    } finally {
        console.log("[TEST] done time: ", Date.now() - startTime + "ms");
        if (fileWriteErrors.length > 0) {
            generelError = true;
            fileWriteErrors.forEach((err, index, allErrors) =>
                console.log(`Error nr. ${index + 1} out of ${allErrors.length}`, err),
            );
        }
        if (deleteFilesAfterTest) {
            files.forEach((file) => {
                if (!file.error) {
                    fs.rm(file.fileName, () => console.log("deleted ", file.fileName));
                }
            });
        }
        if(generelError) {
            return process.exit(1)
        }
        return process.exit(0)
    }
})();
