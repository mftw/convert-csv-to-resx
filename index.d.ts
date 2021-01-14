declare module 'csv-to-resx';

export interface File {
  stringsToFile: string[];
  fileName: string;
  lanCode?: string;
  initial?: string;
}

export type RenderFileTemplate = (...strings: string[]) => string;
export interface FileJob {
  error: null | any;
  success: boolean;
  fileName: string
}

export interface Config {
  projectName?: "projectname",
  silent?: boolean
}

export interface IconvConfig {
  addBOM?: boolean;
  stripBOM?: boolean;
  defaultEncoding?: string
} 

export interface Row {
  Name: string;
  Comment: string,
  [translation: string]: string;
}

// generateFiles.js
export async function generateFiles(fileName = "Translate.csv", config?: Config): FileJob[];

// writeFiles.js
export async function writeFile(file: File, renderFileTemplate: RenderFileTemplate, encoding = "utf-8", config?: IconvConfig): Promise<FileJob>;

export async function writeFiles(files: File[], renderFileTemplate: RenderFileTemplate, encoding = "utf-8", config?: IconvConfig): Promise<FileJob[]>

export function reportErrors(fileJobsOrJob: FileJob | FileJob[]): void;

export function reportSuccess(fileJobsOrJob: FileJob | FileJob[], {verbose = false} = {}): void;

// makeCsvTemplateFile.js
export async function makeCsvTemplateFile(fileName = "./CSVTemplateFile.csv", content = "Name;Comment\n"): Promise<FileJob>

// readCsvFile.js
export async function getRowsAndHeadersFromFile(fileName: string): Promise<[string[], string[]]>;

// getLanCodesAndInitials.js
export function getLanCodesAndInitials(lanCodesAndInitials: string[]): [string[], string[], string[]];

// resx-template.js
export function renderResxTemplate(...strings: string[]): string;

export function renderTranslationNode(name: string, comment: string, value: string): string;

// writeResxFiles.js
export async function writeResxFile(file: File): Promise<FileJob>;

export async function writeResxFiles(files: File[]): Promise<FileJob[]>;

// writeRowsToTsArrayFile.js
export async function writeRowsToJsArrayFile(rows: Row[], lanCodesAndInitials: string[], projectName: string): Promise<FileJob>