'use static'

const fs = require('fs').promises;
const path = require('path');
const cheerio = require('cheerio');
const { optimize, loadConfig } = require('svgo');

const iconsDir = path.resolve(__dirname, '../icons');

const svgAttributes = {
  xmlns: 'http://www.w3.org/2000/svg',
  width: '16',
  height: '16',
  fill: 'currentColor',
  class: '',
  viewBox: '0 0 16 16'
}

async function processFile(file, config)
{
  const filepath = path.resolve(iconsDir, file);
  const basename = path.basename(filepath, '.svg');

  const originalSvg = await fs.readFile(filepath, { encoding: 'utf-8' });
  const optimizedSvg = await optimize(originalSvg, {
    path: filepath,
    ...config
  });

  const $ = await cheerio.load(optimizedSvg.data, {
    xml: {
      xmlMode: true
    }
  });
  const $svgElement = $('svg');

  $svgElement.replaceWith($('svg').append($(this).html()));

  for (const [attribute, value] of Object.entries(svgAttributes))
  {
    $svgElement.removeAttr(attribute);
    $svgElement.attr(attribute, attribute === 'class' ? `bi bi-${basename}` : value);
  }

  const resultSvg = $svgElement.toString().replace(/\r\n?/g, '\n');

  if (resultSvg !== originalSvg)
  {
    await fs.writeFile(filepath, resultSvg, 'utf8');
  }
}

(async () =>
{
  const files = await fs.readdir(iconsDir);
  const config = loadConfig(path.resolve(__dirname, '../svgo.config.js'));

  await Promise.all(files.filter(f => f.endsWith('.svg')).map(f => processFile(f, config)));
})();