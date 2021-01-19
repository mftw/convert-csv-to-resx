const fs = require("fs");
const { makeCsvTemplateFile, generateFiles } = require("../dist/index");

process.on("unhandledRejection", (result, error) => {
    process.exit(1);
});

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
            /******/ "Name;Comment;1033_n-A;9999_no-where\n" +
                /**/ "test-case1;auto generated test file;this is test case 1;lorem ipsum...\n" +
                /**/ "test-case2;&;<div>trolling &</div>;lorem ipsum...\n" +
                /**/ "test-case3;&;;lorem ipsum...\n" +
                /**/ "ræve-rød-båd;tester dansk;testing danish;helt væk 🍔\n",
        );
        console.log("[TEST] generated ", testFilename, "Time:", Date.now() - startTime + "ms");
        const startTimeGenerateFiles = Date.now();
        files = await generateFiles(testFilename, { projectName, silent: true });
        const endTimeGenerateFiles = Date.now() - startTimeGenerateFiles + "ms";
        files.push(csvFile);
        console.log("[TEST] generated " + files.length + " files. Time:", endTimeGenerateFiles);
        fileWriteErrors = files.filter((file) => Boolean(file.error));
    } catch (err) {
        console.error("[TEST] ERROR", err);
        generelError = err;
    } finally {
        if (fileWriteErrors.length > 0) {
            generelError = true;
            fileWriteErrors.forEach((err, index, allErrors) =>
                console.log(`Error nr. ${index + 1} out of ${allErrors.length}`, err),
            );
        }
        if (deleteFilesAfterTest) {
            const startTimeDelete = Date.now();
            files.forEach((file) => {
                if (!file.error) {
                    fs.rmSync(file.fileName, { maxRetries: 10 });
                }
            });
            console.log("[TEST] deleted " + files.length + " files. Time: " + (Date.now() - startTimeDelete) + "ms");
        }
        console.log("[TEST] done time: ", Date.now() - startTime + "ms");
        if (generelError) {
            console.log("[TEST] generelError", generelError);
            return process.exit(1);
        }
        return process.exit(0);
    }
})();
