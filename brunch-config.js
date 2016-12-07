module.exports = {
  files: {
    javascripts: {
      joinTo: {
        'vendor.js': /^(?!app)/,
        'app.js': /^app/,
      },
    },
    stylesheets: {
      joinTo: 'app.css',
    },
  },
  plugins: {
    babel: {
      presets: ['es2015', 'react', 'stage-0'],
    },
  },
  npm: {
    styles: {
      'semantic-ui': ['dist/semantic.min.css'],
    },
  },
};
