export declare function escapeXml(unsafe: string): string;
export declare function generateFiles(inputFileName?: string, { projectName, silent, outputFolder, verbose }?: {
    projectName?: string | undefined;
    silent?: boolean | undefined;
    outputFolder?: string | undefined;
    verbose?: boolean | undefined;
}): Promise<import(".").FileJob[] | undefined>;
