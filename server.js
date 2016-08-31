var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.config');
var spawn = require('child_process').spawn;
var pkg = require('./package');
var app = new (require('express'))();
var port = 3000;
var url = 'http://localhost:' + port;

var compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

app.get("/", function(req, res) {
  res.sendFile(__dirname + '/app/views/index.html')
});

app.listen(port, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info("[%s] ready at [%s]", pkg.name, url);
    spawn('open', [url]);
  }
})
