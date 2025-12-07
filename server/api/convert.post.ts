import { readMultipartFormData, sendStream } from "h3";
import fs from "fs";
import { convertDocxToHtml } from "../util/convert";

export default defineEventHandler(async (event) => {
  const files = await readMultipartFormData(event);
  const file = files?.[0];

  if (!file || !file.filename?.endsWith(".docx")) {
    throw createError({ statusCode: 400, message: "Invalid file" });
  }

  const inputPath = `/tmp/${file.filename}`;
  const outputName = file.filename.replace(".docx", ".html");
  const outputPath = `/tmp/${outputName}`;

  fs.writeFileSync(inputPath, file.data);

  await convertDocxToHtml(inputPath, outputPath);

  const stream = fs.createReadStream(outputPath);

  setHeader(event, "Content-Type", "text/html");
  setHeader(
    event,
    "Content-Disposition",
    `attachment; filename="${outputName}"`
  );

  return sendStream(event, stream);
});
