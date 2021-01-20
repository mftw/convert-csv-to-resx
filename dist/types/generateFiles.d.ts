export declare function escapeXml(unsafe: string): string;
export declare function generateFiles(inputFileName?: string, { projectName, silent }?: {
    projectName?: string;
    silent?: boolean;
}): Promise<import(".").FileJob[]>;
