import { writeFile } from "./lib/file-io/writeFiles";

export async function makeCsvTemplateFile(fileName = "./CSVTemplateFile.csv", content = "Name;Comment\n") {
    const file = {
        fileName,
        stringsToFile: [],
    };
    return writeFile(file, () => content, "utf-8", { addBOM: true });
}
