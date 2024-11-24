import { writeFile as writeFileAsync } from "fs/promises";
import { join } from "path";

export async function writeFile(pathToFile: string, content: string) {
  const path = join(process.cwd(), pathToFile);

  writeFileAsync(path, content, "utf8");
}
