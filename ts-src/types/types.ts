
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

export interface Rows {
  [name: string]: Row;
}

export type DefaultFileName = "Translate.csv" | string
export type DefaultEncoding = "utf-8" | string


export type SuccessConfig = {
  verbose?: boolean
} | {} | undefined 


// makeCsvTemplateFile.js
export type DefaultCsvContent = "Name;Comment\n";
export type DefaultCsvFilename = "./CSVTemplateFile.csv";



export type LanCode = string | number;
export type Initials = string;
export type RawRows = string[]
export type LanCodesAndInitials = [
  LanCode[],
  Initials[],
  RawRows
]