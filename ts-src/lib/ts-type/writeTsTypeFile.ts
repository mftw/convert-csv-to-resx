import type { File } from "../../types/types";
import { writeFile } from "../file-io/writeFiles";

export function renderTsEnumTemplate(enumName: string, enumVals: string[]) {
    return `export type ${enumName} = \n${enumVals.reduce((renderString, string, index, allStrings) => {
        if (allStrings.length === 1) {
            return `    '${string}';\n`;
        }
        if (index === 0) {
            return (renderString += `    '${string}'\n`);
        }
        if (index === allStrings.length - 1) {
            return (renderString += `    | '${string}';`);
        }
        return (renderString += `    | '${string}'\n`);
    }, "")}
`;
}

export async function writeTsEnumFile(file: File, enumName: string) {
    const wrappedRender = (...stringsToFile: string[]) => renderTsEnumTemplate(enumName, stringsToFile);
    return writeFile(file, wrappedRender);
}
