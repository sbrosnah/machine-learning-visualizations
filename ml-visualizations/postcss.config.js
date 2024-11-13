module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    // Minification (only in production)
    ...process.env.NODE_ENV === 'production'
    ? {
        'cssnano': {
          preset: 'default'
        }
      }
    : {}
  },
}
