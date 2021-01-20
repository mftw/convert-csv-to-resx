import type { File, FileJob, IconvConfig, RenderFileTemplate } from "../../types/types";
export declare function writeFile(file: File, renderFileTemplate: RenderFileTemplate, encoding?: string, config?: IconvConfig): Promise<FileJob>;
export declare function writeFiles(files: File[], renderFn: RenderFileTemplate, encoding?: string, config?: IconvConfig): Promise<FileJob[]>;
declare type FileJobOrJobs = FileJob | FileJob[];
export declare function reportErrors(fileJobsOrJob: FileJobOrJobs): void;
export declare function reportSuccess(fileJobsOrJob: FileJobOrJobs, { verbose }?: {
    verbose?: boolean;
}): void;
export {};
