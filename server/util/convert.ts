import fs from "fs";
import mammoth from "mammoth";

export async function convertDocxToHtml(inputPath: string, outputPath: string) {
  const buffer = fs.readFileSync(inputPath);

  const result = await mammoth.convertToHtml(
    { buffer },
    {
      styleMap: [
        "p[style-name='Title'] => h1:fresh",
        "p[style-name='Heading 1'] => h1:fresh",
        "p[style-name='Heading 2'] => h2:fresh",
        "p[style-name='Heading 3'] => h3:fresh",
        "p[style-name='Quote'] => blockquote:fresh",
      ],
    }
  );

  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>Document</title>
</head>
<body>
${result.value}
</body>
</html>`;

  fs.writeFileSync(outputPath, html);
}
