import type { RawRows, Row } from "../../types/types";
export declare function writeRowsToJsArrayFile(rows: Row[], lancodesAndInitials: RawRows, projectName: string, outputFolder?: string): Promise<import("../../types/types").FileJob>;
