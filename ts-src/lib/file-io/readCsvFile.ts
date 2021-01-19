import fs from "fs";
import csv from "csv-parser";

// https://blog.theodo.com/2017/04/csv-excel-escape-from-the-encoding-hell-in-nodejs/
// https://stackoverflow.com/questions/32375816/node-js-change-csv-file-encoding-programatically-and-parse-to-json
import iconv from "iconv-lite";
import type { Rows, Row } from "../../types/types";

export async function getRowsAndHeadersFromFile(filename: string): Promise<[Row[], string[]]> {
    const rows: Rows = {};
    const headers: { [uniqueKey: string]: boolean } = {};

    return new Promise((res, rej) => {
        fs.createReadStream(filename)
            .pipe(iconv.decodeStream("utf-8"))
            .pipe(
                (csv({
                    separator: ";",
                    mapHeaders: ({ header, index }) => {
                        if (header) {
                            headers[header] = true;
                        }
                        if (index === 0) {
                            return "Name";
                        }
                        if (index === 1) {
                            return "Comment";
                        }
                        if (header) {
                            return header;
                        }
                        return null;
                    },
                    mapValues: ({ value, header }) => {
                        if (header) {
                            return value;
                        }
                    },
                } as any) as csv.CsvParser),
            )
            .on("data", (row: any) => {
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

