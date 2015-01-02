module.exports = {
  bower : './src/lib/',
  scripts: ['src/scripts/**/*.js'],


  watchStylus: ['src/styles/**/*.styl'],
  src: {
    fonts: './src/fonts/*',
    images: './src/images/**/*',
    lib: ['src/lib/d3/d3.js', 'src/lib/c3/c3.js'],
    scripts: ['./src/scripts/**/*.js', '!./src/scripts/**/*.spec.js'],
    stylus: './src/styles/index.styl',
    heavyStyles: './src/styles/heavy.styl',
    heavyWatch: ['./src/styles/heavy.styl', './src/styles/heavy/**/*.styl'],
    css: './src/styles/**/*.css',
    allStyles: './src/styles/**/*.styl',
    stylesPath: './src/styles',
    scriptsPath: './src/scripts'
  },
  dist: {
    root: './dist',
    scripts: ['./dist/*.js','!./dist/*.min.js'],
    minScripts: ['./dist/*.min.js'],
    allStyles: ['./dist/*.css'],
    styles: ['./dist/oxford.css','./dist/main.css', './dist/heavy.css'],
    minStyles: ['./dist/oxford.min.css','./dist/main.min.css']
  },
  demo: {
    root: './demo',
    index: './demo/index.html',
    scripts: './demo/**/*.js',
    html:    './demo/**/*.html'
  },
  server: {
    host: 'http://localhost:9000',
  },
  temp:{
    boot: ['src/bootstrap/bootstrap.styl']
  }
  // html: ['src/']
}