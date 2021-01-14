const { writeFile } = require("../file-io/writeFiles");
const { getLandCodesAndInitials } = require("../lang-code-initials/getLandCodesAndInitials");

function renderTemplate(languageMap, [lanCodes, initials, lancodesAndInitials], rows) {
    const typeName = "TranslateNames";
    return `export const defaultStrings = ${JSON.stringify(languageMap, null, 4)};
    
export const translatedComponents = ${JSON.stringify(
        rows.map((row) => row.Name),
        null,
        4,
    )};

export const translatedComponentsCount = translatedComponents.length;

export const translatedLangsMap = ${JSON.stringify(
        [...lanCodes, ...initials, ...lancodesAndInitials].reduce((acc, lang) => {
            acc[lang] = true;
            return acc;
        }, {}),
        null,
        4,
    )};

export type TranslatedLangsType = keyof typeof translatedLangsMap;

export type ${typeName} = keyof typeof defaultStrings;

`;
}
exports.tsLanguageMapRenderTemplate = renderTemplate;

function writeRowsToJsArrayFile(rows, lancodesAndInitials, projectName) {
    const lanCodes = getLandCodesAndInitials(lancodesAndInitials);
    const namesWithTranslations = rows.reduce((acc, row) => {
        // console.log("🚀 ~ file: writeRowsToTsArrayFile.js ~ line 36 ~ namesWithTranslations ~ row", row)
        const [[nameKey, nameValue], [commentName, commentValue], ...langs] = Object.entries(row);
        // const deault1033 = langs.filter(lang => lang[0].includes("1033"))
        const deault1033 = langs.reduce((acc, [lang, value]) => {
            if(lang.includes("1033")) {
                acc.push([lang.slice(0, lang.indexOf("_")), value])
            }
            return acc
        }, [])
        // console.log("🚀 ~ file: writeRowsToTsArrayFile.js ~ line 38 ~ namesWithTranslations ~ langs", langs.filter(lang => lang[0].includes("1033")))
        // console.log("🚀 ~ file: writeRowsToTsArrayFile.js ~ line 49 ~ namesWithTranslations ~ nameValue", nameValue);
        acc[nameValue] = Object.fromEntries([
            [commentName, commentValue],
            ...deault1033
            // ...langs,
            // ...langs.map(([lancodesAndInitials, trans]) => [lancodesAndInitials.slice(lancodesAndInitials.indexOf("_") + 1), trans]),
            // ...langs.map(([lancodesAndInitials, trans]) => {
            //     const test = [lancodesAndInitials.slice(0, lancodesAndInitials.indexOf("_")), trans]
            //     return test.find(e => e === "1033")[1];
            // }),
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
