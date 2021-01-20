export interface File {
    stringsToFile: string[];
    fileName: string;
    lanCode?: string;
    initial?: string;
}
export declare type RenderFileTemplate = (...strings: string[]) => string;
export interface FileJob {
    error: null | any;
    success: boolean;
    fileName: string;
}
export interface Config {
    projectName?: "projectname";
    silent?: boolean;
}
export interface IconvConfig {
    addBOM?: boolean;
    stripBOM?: boolean;
    defaultEncoding?: string;
}
export interface Row {
    Name: string;
    Comment: string;
    [translation: string]: string;
}
export interface Rows {
    [name: string]: Row;
}
export declare type DefaultFileName = "Translate.csv" | string;
export declare type DefaultEncoding = "utf-8" | string;
export declare type SuccessConfig = {
    verbose?: boolean;
} | {} | undefined;
export declare type DefaultCsvContent = "Name;Comment\n";
export declare type DefaultCsvFilename = "./CSVTemplateFile.csv";
export declare type LanCode = string | number;
export declare type Initials = string;
export declare type RawRows = string[];
export declare type LanCodesAndInitials = [
    LanCode[],
    Initials[],
    RawRows
];
