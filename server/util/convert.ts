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
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link href="./activate_app_conditions_en_v3_files/css2" rel="stylesheet" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Nokora:wght@100..900&family=Victor+Mono:ital,wght@0,100..700;1,100..700&family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
      <style>
      body {
        background-color: transparent;
        color: #000;
        padding: 0;
        margin: 0px 30px 50px;
        font-family: "Work Sans", "Nokora";
        font-size: 12px;
        line-height: 22px;
      }

      h1 {
        font-size: 12px;
        line-height: 22px;
        font-family: "Work Sans", "Nokora";
      }

      ol {
        padding-left: 30px;
      }

      ol li {
        padding-left: 6px;
      }

      .wrap-order-number {
        margin-left: 36px;
        position: relative;
        word-break: break-word;
      }

      .wrap-order-number h1,
      .wrap-order-number p {
        position: relative;
      }

      .order-number {
        position: absolute;
        left: -36px;
        top: 0px;
      }

      /* Table fix */
      table {
        border-collapse: collapse; /* key for consistent borders */
        width: 100%;
      }

      td, th {
        padding: 10px !important;
        text-align: left;
        border: 1px solid #dddddd; /* 1px is better than 1pt for screens */
        vertical-align: top;
      }

      /* Dashed order list */
      .order-list-dashed {
        padding: 0;
        margin: 0;
        list-style: none;
      }

      .order-list-dashed li {
        padding-left: 15px;
        position: relative;
      }

      .order-list-dashed li:before {
        content: "-";
        position: absolute;
        left: 0;
      }
    </style>
  </head>
<body>
${result.value}
</body>
</html>`;

  fs.writeFileSync(outputPath, html);
}
