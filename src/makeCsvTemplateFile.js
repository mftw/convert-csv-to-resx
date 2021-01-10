const fs = require("fs");
const iconv = require("iconv-lite");

async function makeCsvTemplateFile(
    fileName = "./CSVTemplateFile.csv",
    content = "Name;Comment\r\n"
) {
    return new Promise((res) => {
        const writeStream = fs.createWriteStream(fileName);
        const status = {
            error: null,
            success: false,
            fileName,
        };
        writeStream.write(iconv.encode(content, "utf-8", { addBOM: true }));
        writeStream.on("error", (err) => {
            if (err) {
                status.error = err;
            }
        });
        writeStream.on("finish", () => {
            status.success = true;
        });
        writeStream.end(() => res(status));
    });
}
exports.makeCsvTemplateFile = makeCsvTemplateFile;

