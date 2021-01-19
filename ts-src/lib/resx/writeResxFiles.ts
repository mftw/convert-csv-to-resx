import { renderResxTemplate } from "./resx-template";
import { writeFile, writeFiles } from "../file-io/writeFiles";
import type { File } from "../../types/types";

export async function writeResxFile(file: File) {
    return writeFile(file, renderResxTemplate);
}

export async function writeResxFiles(files: File[]) {
    return await writeFiles(files, renderResxTemplate)
}
