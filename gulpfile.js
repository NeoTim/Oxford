var gulp    = require('gulp'),
    $       = require('gulp-load-plugins')(),
    open    = require('gulp-open'), // // gulp-open does not work as $.open ????????
    wiredep = require('wiredep'),
    server  = require('./gulp/server.js'),
    paths   = require('./gulp/paths')


var src   = paths.src,
    dist  = paths.dist,
    demo  = paths.demo,
    temp  = paths.temp;



gulp
  .task('default', $.sequence('build', 'watch', 'serve'))
  .task('dist', $.sequence('build:dist', 'watch', 'serve'))
  .task('build', $.sequence('styles','scripts:jshint','scripts:concat','inject', 'bower:inject'))
  .task('build:dist', $.sequence('styles:compile','scripts:jshint','scripts:minify','inject'))
  .task('serve', serve)
  .task('watch', watch)
  .task('test', test)

gulp
    .task('place', $.sequence('build', 'taskboard'))
    .task('taskboard', taskboard)

gulp
  .task('bower:inject', bowerInject)
  .task('inject', inject)

gulp
  .task('scripts:jshint', jsHint)
  .task('scripts:concat', concatScripts)
  .task('scripts:minify', minifyScripts)

gulp
  .task('styles', $.sequence('heavy', 'stylus', 'css'))
  .task('stylus', stylus)
  .task('heavy', stylusHeavy)
  .task('css', css)
  .task('styles:compile', compileStyles)

gulp
  .task('stylus:bower', stylusBower)

/*
 *  Runs the server.js file
 *  the server file is serving up demo/index.html, dist/, and src/
 *  Now in your index.html you can access the files by prepending a root slash
 *  Example: In order to load ./src/scripts/main.js you would put the following in demo/index.html
 *  - <script src="/scripts/main.js"></script>
 *
*/

// @NOTE 'serve' just runs the server.js and builds files
// @NOTE 'server' runs the serve task and opens the browser
function serve(){
  server.run();
}
function server(){
  return gulp.src( demo.index )
    .pipe( open("", {url: paths.server.host} ));
}

function test(){
  return $.shell.task([
    'karma start karma.conf.js --browsers Firefox --single-run'
  ])
}

function stylus(){
  return gulp.src( src.stylus )
    .pipe( $.stylus() )
    .pipe( $.rename('main.css') )
    .pipe( gulp.dest( dist.root ));
}
function stylusHeavy(){
  return gulp.src( src.heavyStyles )
    .pipe( $.stylus() )
    .pipe( $.rename('heavy.css') )
    .pipe( gulp.dest( dist.root ));
}

function compileStyles(done){
  stylus()
  css()
  gulp.src( dist.allStyles )
    .pipe( $.concat('oxford.min.css') )
    .pipe( gulp.dest( dist.root ) )
    .on('end', function(){
      done()
    })

}

function stylusBower(){
  return gulp.src( temp.boot )
    .pipe( $.stylus() )
    .pipe( $.concat('boot.stylus.css') )
    .pipe( gulp.dest( dist.root ))
    // .pipe ($.notify({message: 'Stylus Compiled'}) )
}
function css(){
  return gulp.src( src.css )
    .pipe( $.concat('oxford.css') )
    .pipe( gulp.dest( dist.root ))
}

function jsHint(){
  return gulp.src( src.scripts )
    .pipe( $.jshint() )
    .pipe( $.jshint({reporter: 'jshint-stylish'}) )
}
function concatScripts(){
  return gulp.src( src.scripts )
    .pipe( $.concat('oxford.js') )
    .pipe( gulp.dest( dist.root ) );
}
function minifyScripts(){
  return gulp.src( src.scripts )
    .pipe( $.concat('oxford.min.js') )
    .pipe( $.uglify())
    .pipe( gulp.dest( dist.root ) );
}

/*
 *  Inject BOWER DEPENDENCIES with wiredep into demo/index.html
 *  @NOTE Wiredep will only inject the files by prepedning them with a ../ this still works.
 */
function bowerInject(){
  var wire = wiredep.stream;
  return gulp.src( demo.index )
    .pipe( wire({
      directory: paths.bower,
      ignorePath: '/src'
    }))
    .pipe( gulp.dest( demo.root ) );

}


/*
 *  Inject JS and CSS files into demo/index.html
 */
function inject(){


  /*
   * @NOTE: read:false tells gulp to not read the file's contents. We just want the file paths;
   */

  // Grab all js files in './src/scripts'
  var scripts     = gulp.src( src.scripts, {read:false} );
  // Grab dist/oxford.css and dist/main
  var styles      = gulp.src( dist.styles, {read:false} );
  // Grab all the demo js files
  var demoScripts = gulp.src( demo.scripts, {read:false} );
  // Grab demo/index.html, read is not false,
  // because we need to read the file in order to find wheer to inject;
  var target      = gulp.src( demo.index );

  return target
    // Inject '/scripts' into demo/index.html
    .pipe( $.inject( scripts, {
      addRootSlash: true,
      relative:false,
      ignorePath: 'src',
      name: 'scripts'
    }))
    // inject '/oxford.css' and './main.css' into demo/index.html
    .pipe($.inject( styles, {
      addRootSlash: true,
      relative:false,
      ignorePath: 'dist',
      name: 'styles'
    }))
    .pipe($.inject( demoScripts, {
      addRootSlash: false,
      relative:true,
      name: 'demo'
    }))
    .pipe( gulp.dest( demo.root ) );
}
function watch(){
  gulp.watch([demo.index, demo.scripts], $.livereload.changed);
  // gulp.watch( [paths.boot, './src/bootstrap/**/*.styl'],['stylus:bootstrap', $.livereload.changed]);
  gulp.watch( src.scripts, ['scripts:jshint', $.livereload.changed] );
  gulp.watch( src.allStyles, ['stylus', $.livereload.changed]);
  gulp.watch( demo.html,  $.livereload.changed);
  gulp.watch( src.stylesPath, ['stylus'] )
  gulp.watch( src.scriptsPath, ['scripts:concat'] )
  gulp.watch( src.heavyWatch, ['heavy', $.livereload.changed] )

}

function taskboard(){
  return gulp.src('./dist/**/*')
    .pipe( gulp.dest('../../taskboard/client/flex') )
}

//task to tell travis to run karma start and run in phantom.js



