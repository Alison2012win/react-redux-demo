var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('./webpack.config')

var debug = require('debug')('blog-ssh');
var app = require('./app');
app.set('port', process.env.PORT || 3001); // 配置端口号
var port = 3001

var compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

app.get("/", function(req, res) {
  res.sendFile(__dirname + '/index.html')
})

var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});
