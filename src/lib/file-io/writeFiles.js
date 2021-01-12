const fs = require("fs");
const iconv = require("iconv-lite");

async function writeFile(file, renderFileTemplate, encoding = "utf-8", config) {
    return new Promise((res) => {
        // Write all files with CRLF "\r\n"
        const renderResult = renderFileTemplate(...file.stringsToFile).split("\n").join("\r\n")
        const writeStream = fs.createWriteStream(file.fileName);
        writeStream.write(
            iconv.encode(renderResult, encoding, config)
        );
        const status = {
            error: null,
            success: false,
            fileName: file.fileName,
        };
        writeStream.on("error", (err) => {
            if (err) {
                status.error = err;
            } 
            res(status);
        });
        writeStream.on("finish", () => {
            if(!status.error) {
                status.success = true;
            }
            // console.log("wrote all data to file");
        });
        writeStream.end(() => res(status));
    });
}
exports.writeFile = writeFile;

async function writeFiles(files, renderFn) {
    return Promise.all(files.map((file) => writeFile(file, renderFn)));
}
exports.writeFiles = writeFiles;

function reportErrors(fileJobsOrJob) {
    const fileJobs = Array.isArray(fileJobsOrJob)
        ? fileJobsOrJob
        : [fileJobsOrJob];
    const errors = fileJobs.filter((job) => Boolean(job.error));
    if (errors.length !== 0) {
        errors.forEach(({ error, fileName }) =>
            console.log("[ERROR] Writing file " + fileName, error)
        );
    }
}
exports.reportErrors = reportErrors;

function reportSuccess(fileJobsOrJob, { verbose = false } = {}) {
    const fileJobs = Array.isArray(fileJobsOrJob)
        ? fileJobsOrJob
        : [fileJobsOrJob];
    if (verbose) {
        fileJobs.forEach((fileJob) => {
            console.log("[JOB VERBOSE] Written " + fileJob.fileName);
        });
    } else if (fileJobs.length === 1) {
        console.log("[DONE] Written " + fileJobs[0].fileName);
    } else {
        const fileName = fileJobs[0].fileName;
        const fileExtension = fileName.slice(fileName.lastIndexOf(".") + 1);
        console.log(
            `[DONE] Written ${fileJobs.length} '.${fileExtension}' ${
                fileJobs.length === 1 ? "file" : "files"
            }`
        );
    }
}
exports.reportSuccess = reportSuccess;
