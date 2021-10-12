import fs from "fs";
import iconv from "iconv-lite";
import type { DefaultEncoding, File, FileJob, IconvConfig, RenderFileTemplate } from "../../types/types";

export async function writeFile(
    file: File,
    renderFileTemplate: RenderFileTemplate,
    encoding = "utf-8",
    config?: IconvConfig,
): Promise<FileJob> {
    return new Promise(res => {
        const status: FileJob = {
            error: null,
            success: false,
            fileName: file.fileName,
        };
        // Write all files with CRLF "\r\n"
        const renderResult = renderFileTemplate(...file.stringsToFile)
            .split("\n")
            .join("\r\n");
        const writeStream = fs.createWriteStream(file.fileName);
        writeStream.write(iconv.encode(renderResult, encoding, config));
        writeStream.on("error", err => {
            if (err) {
                status.error = err;
            }
            res(status);
        });
        writeStream.on("finish", () => {
            if (!status.error) {
                status.success = true;
            }
            // console.log("wrote all data to file");
        });
        writeStream.end(() => res(status));
    });
}

export async function writeFiles(
    files: File[],
    renderFn: RenderFileTemplate,
    encoding = "utf-8",
    config?: IconvConfig,
): Promise<FileJob[]> {
    return Promise.all(files.map(file => writeFile(file, renderFn, (encoding = "utf-8"), config)));
}
// exports.writeFiles = writeFiles;

type FileJobOrJobs = FileJob | FileJob[];

export function reportErrors(fileJobsOrJob: FileJobOrJobs) {
    const fileJobs = Array.isArray(fileJobsOrJob) ? fileJobsOrJob : [fileJobsOrJob];
    const errors = fileJobs.filter(job => Boolean(job.error));
    if (errors.length !== 0) {
        errors.forEach(({ error, fileName }) => console.log("[ERROR] Writing file " + fileName, error));
    }
}
// exports.reportErrors = reportErrors;

export function reportSuccess(fileJobsOrJob: FileJobOrJobs, { verbose = false } = {}) {
    const fileJobs = Array.isArray(fileJobsOrJob) ? fileJobsOrJob : [fileJobsOrJob];
    if (verbose) {
        fileJobs.forEach(fileJob => {
            console.log("[JOB VERBOSE] Written " + fileJob.fileName);
        });
    } else if (fileJobs.length === 1) {
        console.log("[DONE] Written " + fileJobs[0].fileName);
    } else {
        const fileName = fileJobs[0].fileName;
        const fileExtension = fileName.slice(fileName.lastIndexOf(".") + 1);
        console.log(
            `[DONE] Written ${fileJobs.length} '.${fileExtension}' ${fileJobs.length === 1 ? "file" : "files"}`,
        );
    }
}

export function reportStatus(fileJobsOrJob: FileJobOrJobs, { verbose = false } = {}) {
    const fileJobs = Array.isArray(fileJobsOrJob) ? fileJobsOrJob : [fileJobsOrJob];
    const successful = fileJobs.filter(job => !job.error);
    const errors = fileJobs.filter(job => Boolean(job.error));
    if (verbose) {
        successful.forEach(fileJob => {
            console.log("[JOB VERBOSE] JOB ORDERED: " + fileJob.fileName);
        });
    }
    if (successful.length) {
        if (successful.length === 1) {
            console.log("[DONE] Written " + successful[0].fileName);
        } else {
            const fileName = fileJobs[0].fileName;
            const fileExtension = fileName.slice(fileName.lastIndexOf(".") + 1);
            console.log(
                `[DONE] Written ${fileJobs.length} '.${fileExtension}' ${fileJobs.length === 1 ? "file" : "files"}`,
            );
        }
    }
    if (errors.length) {
        errors.forEach(({ error, fileName }) => console.log("[ERROR] Writing file " + fileName, error));
    }
    return errors;
}
