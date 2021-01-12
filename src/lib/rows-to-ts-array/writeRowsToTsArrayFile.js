const { writeFile } = require("../file-io/writeFiles");

// function renderTemplate(...strings) {
function renderTemplate(languageMap, rows) {
    return `export const languageMap = ${JSON.stringify(languageMap, null, 4)};

export const languageKeys = ${JSON.stringify(
        rows.map((row) => row.Name),
        null,
        4,
    )}

export function getDefaultTranslation(name: keyof typeof languageMap, lang = "1033", showOnNotFound = "No translation found"): string {
    try {
        if(languageMap[name][lang]) {
            return languageMap[name][lang]
        }
        return showOnNotFound
    } catch(e) {
        return showOnNotFound
    }
}

`;
}

function writeRowsToJsArrayFile(rows, projectName) {
    const namesWithTranslations = rows.reduce((acc, row) => {
        const [[nameKey, nameValue], [commentName, commentValue], ...langs] = Object.entries(row);
        acc[nameValue] = Object.fromEntries([
            [commentName, commentValue],
            ...langs,
            ...langs.map(([lancodesAndInitials, trans]) => [lancodesAndInitials.slice(lancodesAndInitials.indexOf("_") + 1), trans]),
            ...langs.map(([lancodesAndInitials, trans]) => [lancodesAndInitials.slice(0, lancodesAndInitials.indexOf("_")), trans]),
        ]);
        return acc;
    }, {});
    const file = {
        fileName: "./" + projectName + "-locales.ts",
        stringsToFile: [namesWithTranslations, rows],
    };
    return writeFile(file, renderTemplate);
}

exports.writeRowsToJsArrayFile = writeRowsToJsArrayFile;
