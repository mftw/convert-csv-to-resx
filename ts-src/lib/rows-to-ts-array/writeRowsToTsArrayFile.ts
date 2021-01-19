import { writeFile } from "../file-io/writeFiles";
import { getLanCodesAndInitials } from "../lang-code-initials/getLanCodesAndInitials";
import type { RawRows, Row } from "../../types/types";

function renderTemplate(languageMap: any, [lanCodes, initials, lancodesAndInitials]: [string[], string[], string[]], rows: Row[]) {

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
        }, {} as any),
        null,
        4,
    )};

export type TranslatedLangsType = keyof typeof translatedLangsMap;

export type ${typeName} = keyof typeof defaultStrings;

`;
}

export function writeRowsToJsArrayFile(rows: Row[], lancodesAndInitials: RawRows, projectName: string) {
    const lanCodes = getLanCodesAndInitials(lancodesAndInitials);
    const namesWithTranslations = rows.reduce((acc: Row, row) => {
        const [[nameKey, nameValue], [commentName, commentValue], ...langs] = Object.entries(row);
        const deault1033 = langs.reduce((acc, [lang, value]) => {
            if(lang.includes("1033") && value) {
                return value
            }
            return acc
        }, "No default translation")
        acc[nameValue] = deault1033;
        // acc[nameValue] = Object.fromEntries([
        //     [commentName, commentValue],
        //     ...deault1033
        //     // ...langs,
        //     // ...langs.map(([lancodesAndInitials, trans]) => [lancodesAndInitials.slice(lancodesAndInitials.indexOf("_") + 1), trans]),
        //     // ...langs.map(([lancodesAndInitials, trans]) => {
        //     //     const test = [lancodesAndInitials.slice(0, lancodesAndInitials.indexOf("_")), trans]
        //     //     return test.find(e => e === "1033")[1];
        //     // }),
        // ]);

        return acc;
    }, {} as Row );
    const file = {
        fileName: "./" + projectName + "-locales.ts",
        stringsToFile: [namesWithTranslations, lanCodes, rows],
    };
    return writeFile(file as any, renderTemplate as any);
}

