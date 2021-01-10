const { writeFile } = require("../file-io/writeFiles");

function renderTsEnumTemplate(enumName, enumVals) {
    return `export type ${enumName} = \n${enumVals.reduce((renderString, string, index, allStrings) => {
        if (allStrings.length === 1) {
            return `     '${string}';\n`;
        }
        if (index === 0) {
            return (renderString += `     '${string}'\n`);
        }
        if (index === allStrings.length - 1) {
            return (renderString += `     | '${string}';`);
        }
        return (renderString += `     | '${string}'\n`);
    }, "")}
`;
}
exports.renderTsEnumTemplate = renderTsEnumTemplate;

async function writeTsEnumFile(file, enumName) {
    const wrappedRender = (...stringsToFile) => renderTsEnumTemplate(enumName, stringsToFile);
    return writeFile(file, wrappedRender);
}
exports.writeTsEnumFile = writeTsEnumFile;
