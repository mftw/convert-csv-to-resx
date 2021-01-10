function renderTsEnumTemplate(enumName, enumVals) {
    return `export type ${enumName} = \n ${enumVals.reduce(
        (renderString, string, index, allStrings) => {
            return renderString === ""
                ? // First value
                  `    '${string}'\n`
                : index === allStrings.length - 1
                ? // Last Value
                  (renderString += `     | '${string}';`)
                : // Other Values
                  (renderString += `     | '${string}'\n`);
        },
        ""
    )}
`;
}
exports.renderTsEnumTemplate = renderTsEnumTemplate;
