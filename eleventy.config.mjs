import { DateTime } from 'luxon';
import pluginRss from '@11ty/eleventy-plugin-rss';
import Image from '@11ty/eleventy-img';
import path from 'node:path';

export default async function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);

  eleventyConfig.addPassthroughCopy({ 'src/assets/css': 'assets/css' });
  eleventyConfig.addPassthroughCopy({ 'src/assets/js': 'assets/js' });
  eleventyConfig.addPassthroughCopy({ 'src/assets/fonts': 'assets/fonts' });
  eleventyConfig.addPassthroughCopy({
    'node_modules/@fontsource-variable/source-serif-4/files/source-serif-4-latin-wght-normal.woff2':
      'assets/fonts/source-serif-4-latin-wght-normal.woff2',
    'node_modules/@fontsource-variable/source-serif-4/files/source-serif-4-latin-wght-italic.woff2':
      'assets/fonts/source-serif-4-latin-wght-italic.woff2',
    'node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2':
      'assets/fonts/inter-latin-wght-normal.woff2',
    'node_modules/@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2':
      'assets/fonts/jetbrains-mono-latin-wght-normal.woff2',
  });
  eleventyConfig.addPassthroughCopy({ public: '/' });

  eleventyConfig.addFilter('dateISO', (d) => DateTime.fromJSDate(new Date(d), { zone: 'utc' }).toISODate());
  eleventyConfig.addFilter('dateLong', (d) =>
    DateTime.fromJSDate(new Date(d), { zone: 'utc' }).toFormat('LLLL d, yyyy')
  );
  eleventyConfig.addFilter('year', (d) => DateTime.fromJSDate(new Date(d), { zone: 'utc' }).toFormat('yyyy'));

  eleventyConfig.addAsyncShortcode('portrait', async function (src, alt, widths = [240, 480]) {
    const inputPath = path.join('src/assets/portraits', src);
    const metadata = await Image(inputPath, {
      widths,
      formats: ['webp', 'jpeg'],
      outputDir: '_site/portraits/',
      urlPath: '/portraits/',
      filenameFormat: (id, srcPath, width, format) => {
        const name = path.basename(srcPath, path.extname(srcPath));
        return `${name}-${width}w.${format}`;
      },
    });
    const imageAttributes = {
      alt,
      sizes: `(max-width: 480px) 240px, 480px`,
      loading: 'lazy',
      decoding: 'async',
    };
    return Image.generateHTML(metadata, imageAttributes);
  });

  return {
    dir: {
      input: 'src/pages',
      includes: '../_includes',
      data: '../_data',
      output: '_site',
    },
    templateFormats: ['njk', 'md', '11ty.js'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
  };
}
