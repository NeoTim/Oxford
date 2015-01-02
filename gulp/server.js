var express   = require('express');
var reloader  = require('connect-livereload');
var path      = require('path');

module.exports.run = function(){


var app = express()

app.use( reloader() )
app.use( express.static( path.join( './', '.tmp' ) ) )
app.use( express.static( path.join( './', 'src' ) ) )
app.use( express.static( path.join( './', 'dist' ) ) )
app.use( express.static( path.join( './', 'demo' ) ) )

app.listen( 8000, '127.0.0.1', function(){
  console.log('Server Listening on 8000')
  console.log('Serving demo/index.html')

  console.log('Serving localhost:8000/dist as /')
  console.log('Serving localhost:8000/src as /')
});

  return module.exports.app = app;
}