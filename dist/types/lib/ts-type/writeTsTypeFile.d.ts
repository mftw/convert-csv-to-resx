import type { File } from "../../types/types";
export declare function renderTsEnumTemplate(enumName: string, enumVals: string[]): string;
export declare function writeTsEnumFile(file: File, enumName: string): Promise<import("../../types/types").FileJob>;
