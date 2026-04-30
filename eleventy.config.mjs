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

  const sortByDateDesc = (a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0);
  const sortByDateAsc = (a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0);

  eleventyConfig.addFilter('byKind', (log, kind) =>
    (log || []).filter((e) => e.kind === kind).sort(sortByDateDesc)
  );
  eleventyConfig.addFilter('byKinds', (log, csv) => {
    const kinds = csv.split(',').map((s) => s.trim());
    return (log || []).filter((e) => kinds.includes(e.kind)).sort(sortByDateDesc);
  });
  eleventyConfig.addFilter('byTheme', (log, theme) =>
    (log || []).filter((e) => Array.isArray(e.themes) && e.themes.includes(theme)).sort(sortByDateDesc)
  );
  eleventyConfig.addFilter('byCareerGroup', (log, group) =>
    (log || []).filter((e) => e.careerGroup === group).sort(sortByDateAsc)
  );
  eleventyConfig.addFilter('byProjectSlug', (log, slug) =>
    (log || []).find((e) => e.kind === 'project' && e.slug === slug)
  );
  eleventyConfig.addFilter('groupByYear', (log) => {
    const groups = new Map();
    for (const e of (log || []).slice().sort(sortByDateDesc)) {
      const y = (e.date || '').slice(0, 4);
      if (!groups.has(y)) groups.set(y, []);
      groups.get(y).push(e);
    }
    return Array.from(groups.entries()).map(([year, items]) => ({ year, items }));
  });
  eleventyConfig.addFilter('spanLabel', (e) => {
    const start = (e.date || '').slice(0, 4);
    if (e.ongoing || !e.end_date) return `${start} –`;
    const end = (e.end_date || '').slice(0, 4);
    return start === end ? start : `${start} – ${end}`;
  });
  eleventyConfig.addFilter('kindLabel', (kind) => {
    const map = {
      role: 'Role',
      project: 'Project',
      standard: 'Standard',
      award: 'Recognition',
      fellowship: 'Fellowship',
      contribution: 'Contribution',
      press: 'Press',
      talk: 'Talk',
      paper: 'Paper',
      post: 'Post',
    };
    return map[kind] || kind;
  });
  eleventyConfig.addFilter('limit', (arr, n) => (arr || []).slice(0, n));

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
