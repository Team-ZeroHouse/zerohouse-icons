module.exports = {
  inputDir: './icons', // (required)
  outputDir: './font', // (required)
  fontTypes: ['woff2', 'woff'],
  assetTypes: ['css', 'html', 'json'],
  name: 'zerohouse-icons',
  prefix: 'zi',
  selector: '.zi',
  fontsUrl: './fonts',
  formatOptions: {
    json: {
      indent: 2
    }
  },
  // Use a custom Handlebars template
  templates: {
    css: './build/font/css.hbs',
    html: './build/font/html.hbs'
  },
  pathOptions: {
    json: './font/zerohouse-icons.json',
    css: './font/zerohouse-icons.css',
    html: './font/index.html',
    ttf: './font/fonts/zerohouse-icons.ttf',
    woff: './font/fonts/zerohouse-icons.woff',
    woff2: './font/fonts/zerohouse-icons.woff2',
    eot: './font/fonts/zerohouse-icons.eot'
  }
};
