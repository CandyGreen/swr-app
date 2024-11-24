import { access, readFile as readFileAsync } from "fs/promises";
import { join } from "path";

export async function readFile(pathToFile: string) {
  const path = join(process.cwd(), pathToFile);

  try {
    await access(path);
  } catch {
    return null;
  }

  return readFileAsync(path, { encoding: "utf8" });
}
