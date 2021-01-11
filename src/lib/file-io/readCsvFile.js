const fs = require("fs");
const csv = require("csv-parser");

// https://blog.theodo.com/2017/04/csv-excel-escape-from-the-encoding-hell-in-nodejs/
// https://stackoverflow.com/questions/32375816/node-js-change-csv-file-encoding-programatically-and-parse-to-json
const iconv = require("iconv-lite");

function getRowsAndHeadersFromFile(filename) {
    const rows = {};
    const headers = {};

    return new Promise((res, rej) => {
        fs.createReadStream(filename)
            .pipe(iconv.decodeStream("utf-8"))
            .pipe(
                csv({
                    separator: ";",
                    mapHeaders: ({ header, index }) => {
                        if(index === 0) {
                            return "Name"
                        }
                        if(index === 1) {
                            return "Comment"
                        }
                        if(header) {
                            headers[header] = true;
                            return header;
                        }
                    },
                    mapValues: ({ value, header }) => {
                        if (header) {
                            return value;
                        }
                    },
                }),
            )
            .on("data", (row) => {
                rows[row.Name] = row;
            })
            .on("end", () => {
                res([Object.values(rows), Object.keys(headers)]);
            })
            .on("error", () => {
                rej();
            });
    });
}

exports.getRowsAndHeadersFromFile = getRowsAndHeadersFromFile;
