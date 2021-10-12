import { writeResxFiles } from "./lib/resx/writeResxFiles";
import { writeRowsToJsArrayFile } from "./lib/rows-to-ts-array/writeRowsToTsArrayFile";
import { getRowsAndHeadersFromFile } from "./lib/file-io/readCsvFile";
import { reportStatus } from "./lib/file-io/writeFiles";
import { getLanCodesAndInitials } from "./lib/lang-code-initials/getLanCodesAndInitials";

export function escapeXml(unsafe: string) {
    return unsafe.replace(/[<>&'"]/g, (c: string) => {
        switch (c) {
            case "<":
                return "&lt;";
            case ">":
                return "&gt;";
            case "&":
                return "&amp;";
            case '"':
                return "&quot;";
            case "'":
                return "&apos;";
            default:
                return c;
        }
    });
}

export async function generateFiles(
    inputFileName = "Translate.csv",
    { projectName = "projectname", silent = true, outputFolder = "./", verbose = false } = {},
) {
    try {
        if (!silent) console.log("[WORKING] Processing " + inputFileName + " ...");

        const [rows, headers] = await getRowsAndHeadersFromFile(inputFileName);
        if (!silent) console.log("[DONE] CSV file processed");

        if (!rows.length) {
            console.log("[ERROR] '" + inputFileName + "' does not contain any rows");
            console.log("Sure you're not using an empty template? Please check file.");
            return;
        }

        const lancodesAndInitials = headers.slice(2);
        const [lanCodes] = getLanCodesAndInitials(lancodesAndInitials); // lanCodes is alignet with lancodesAndInitial
        const resxFileNames = lanCodes.map((lanCode) => `./${projectName}.${lanCode}.resx`);

        const resxFiles = resxFileNames.map((fileName, index) => {
            const keyName = lancodesAndInitials[index];
            const stringsToFile = rows.map((row) => {
                return [escapeXml(row.Name), escapeXml(row.Comment), escapeXml(row[keyName])];
            });
            return {
                stringsToFile,
                fileName,
            };
        });

        const jsMapFileJob = await writeRowsToJsArrayFile(rows, lancodesAndInitials, projectName, outputFolder);
        const resxFileJobs = await writeResxFiles(resxFiles as any);
        const jobs = [jsMapFileJob, ...resxFileJobs];

        if (!silent) {
            const errors = reportStatus(jobs, { verbose });
            if (errors.length) {
                console.log("FAILED WITH", errors.length, "FILES");
            }
        }

        return jobs;
    } catch (error) {
        console.log("[ERROR] Conversion:", error);
        throw error;
    }
}
