const { writeFile } = require("../file-io/writeFiles");
const { getLandCodesAndInitials } = require("../lang-code-initials/getLandCodesAndInitials");

function renderTemplate(languageMap, [lanCodes, initials, lancodesAndInitials], rows) {
    const typeName = "TranslatedComponentType";
    return `export const languageMap = ${JSON.stringify(languageMap, null, 4)};
    
export const translatedComponents = ${JSON.stringify(
    rows.map((row) => row.Name),
    null,
    4,
)};

export const translatedComponentsCount = translatedComponents.length;

export const translatedLangsMap = ${JSON.stringify([...lanCodes, ...initials, ...lancodesAndInitials].reduce((acc, lang) => {
    acc[lang] = true;
    return acc
}, {}), null, 4)};

export type TranslatedLangsType = keyof typeof translatedLangsMap;

export type ${typeName} = keyof typeof languageMap;

export function getDefaultTranslation(name: ${typeName}, lang = "1033", showOnNotFound = "No translation found"): string {
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
exports.tsLanguageMapRenderTemplate = renderTemplate;

function writeRowsToJsArrayFile(rows, lancodesAndInitials, projectName) {
    const lanCodes = getLandCodesAndInitials(lancodesAndInitials)
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
        stringsToFile: [namesWithTranslations, lanCodes, rows],
    };
    return writeFile(file, renderTemplate);
}

exports.writeRowsToJsArrayFile = writeRowsToJsArrayFile;
