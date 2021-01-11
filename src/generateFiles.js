const { writeResxFiles } = require("./lib/resx/writeResxFiles");
const { writeTsEnumFile } = require("./lib/ts-enum/writeTsEnumFile");
const { writeRowsToJsArrayFile } = require("./lib/rows-to-js-array/writeRowsToJsArrayFile");
const { getRowsAndHeadersFromFile } = require("./lib/file-io/readCsvFile");
const { reportErrors, reportSuccess } = require("./lib/file-io/writeFiles");

function getLandCodesAndInitials(lancodesAndInitials) {
    return lancodesAndInitials.reduce(
        (splittedLanCodesAndInitials, codeIni) => {
            const [lanCodes, initials] = splittedLanCodesAndInitials;
            const [lanCode, initial] = codeIni.split("_");
            lanCodes.push(lanCode);
            initials.push(initial);
            return splittedLanCodesAndInitials;
        },
        [[], [], lancodesAndInitials],
    );
}

async function generateFiles(
    inputFileName = "Translate.csv",
    { projectName = "projectname", enumName = "langs", silent = false } = {},
) {
    try {
        if (!silent) console.log("[WORKING] Processing " + inputFileName + " ...");

        const [rows, headers] = await getRowsAndHeadersFromFile(inputFileName);
        if (!silent) console.log("[DONE] CSV file processed");

        if (rows.length === 0) {
            console.log("[ERROR] '" + inputFileName + "' does not contain any rows");
            console.log("Sure you're not using an empty template? Please check file.");
            return;
        }

        const lancodesAndInitials = headers.slice(2);
        const [lanCodes, initials] = getLandCodesAndInitials(lancodesAndInitials);
        const resxFileNames = lanCodes.map((lanCode) => `./${projectName}.${lanCode}.resx`);

        const resxFiles = resxFileNames.map((fileName, index) => {
            const lanCode = lanCodes[index];
            const initial = initials[index];
            const keyName = lancodesAndInitials[index];
            const stringsToFile = rows.map((row) => {
                return [row.Name, row.Comment, row[keyName]];
            });
            return {
                lanCode,
                initial,
                stringsToFile,
                fileName,
            };
        });

        const enumFile = {
            fileName: `./${projectName}-${enumName}.ts`,
            stringsToFile: rows.map((row) => row.Name),
        };

        const tsEnumFileJob = await writeTsEnumFile(enumFile, enumName);

        const jsMapFileJob = await writeRowsToJsArrayFile(rows, projectName);

        const resxFileJobs = await writeResxFiles(resxFiles);

        if (!silent) {
            reportErrors(tsEnumFileJob);
            reportSuccess(tsEnumFileJob);
            reportErrors(jsMapFileJob);
            reportSuccess(jsMapFileJob);
            reportErrors(resxFileJobs);
            reportSuccess(resxFileJobs);
        }

        return [tsEnumFileJob, jsMapFileJob, ...resxFileJobs];
    } catch (error) {
        console.log("[ERROR] Conversion:", error);
        throw error;
    }
}
exports.generateFiles = generateFiles;
