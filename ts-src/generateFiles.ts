import { writeResxFiles } from "./lib/resx/writeResxFiles";
import { writeRowsToJsArrayFile }  from "./lib/rows-to-ts-array/writeRowsToTsArrayFile";
import { getRowsAndHeadersFromFile }  from "./lib/file-io/readCsvFile";
import { reportErrors, reportSuccess } from "./lib/file-io/writeFiles";
import { getLanCodesAndInitials } from "./lib/lang-code-initials/getLanCodesAndInitials";

export function escapeXml(unsafe: string) {
    return unsafe.replace(/[<>&'"]/g, (c: string) => {
        switch (c) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case '"': return '&quot;';
            case '\'': return '&apos;';
            default: return c
        }
    });
}

export async function generateFiles(
    inputFileName = "Translate.csv",
    { projectName = "projectname", silent = true } = {},
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
        const [lanCodes, initials] = getLanCodesAndInitials(lancodesAndInitials as any);
        const resxFileNames = lanCodes.map((lanCode) => `./${projectName}.${lanCode}.resx`);

        const resxFiles = resxFileNames.map((fileName, index) => {
            // const lanCode = lanCodes[index];
            // const initial = initials[index];
            const keyName = lancodesAndInitials[index];
            const stringsToFile = rows.map((row) => {
                return [escapeXml(row.Name), escapeXml(row.Comment), escapeXml(row[keyName])];
            });
            return {
                // lanCode,
                // initial,
                stringsToFile,
                fileName,
            };
        });

        const jsMapFileJob = await writeRowsToJsArrayFile(rows, lancodesAndInitials, projectName);

        const resxFileJobs = await writeResxFiles(resxFiles as any);

        if (!silent) {
            reportErrors(jsMapFileJob);
            reportSuccess(jsMapFileJob);
            reportErrors(resxFileJobs);
            reportSuccess(resxFileJobs);
        }

        return [jsMapFileJob, ...resxFileJobs];

    } catch (error) {
        console.log("[ERROR] Conversion:", error);
        throw error;
    }
}
