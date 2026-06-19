import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import postcss from 'postcss';
import purgecss from '@fullhuman/postcss-purgecss';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const bootstrapPath = path.join(root, 'node_modules/bootstrap/dist/css/bootstrap.min.css');
const outputPath = path.join(root, 'src/bootstrap-purged.css');

const css = readFileSync(bootstrapPath, 'utf8');

const result = await postcss([
  purgecss({
    content: [
      path.join(root, 'index.html'),
      path.join(root, 'src/**/*.jsx'),
    ],
    safelist: {
      standard: [/^html$/, /^body$/, /^\*$/, /^a$/, /^ul$/, /^li$/, /^button$/, /^input$/, /^label$/, /^form$/, /^\*,\s*::before/],
      greedy: [/^col(-|$)/, /^offset-/, /^order-/, /^row$/, /^container/, /^g-/, /^gy-/, /^gx-/, /^gap-/, /^d-/, /^flex-/, /^justify-/, /^align-/, /^text-/, /^fw-/, /^fs-/, /^m[tbsexy]?-/, /^p[tbsexy]?-/, /^w-/, /^h-/, /^position-/, /^z-/, /^lh-/, /^border/, /^rounded/, /^shadow/, /^bg-/, /^form-/, /^btn/, /^input-group/, /^visually-hidden/, /^list-unstyled/, /^small$/],
    },
  }),
]).process(css, { from: bootstrapPath, to: outputPath });

writeFileSync(outputPath, result.css);

console.log(`Bootstrap: ${(css.length / 1024).toFixed(1)} KiB -> ${(result.css.length / 1024).toFixed(1)} KiB`);
