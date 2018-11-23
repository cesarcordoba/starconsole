var express = require('express');
var app = express();
var route = require('express').Router();
var path = require('path');
var bigbang = require('./bigbang');
var blackhole = require('./blackhole');
var bodyParser = require('body-parser');

var lessMiddleware = require('less-middleware')


app.set('nasa/hubble', path.join(__dirname, 'nasa/hubble'));
app.set("view engine", "jade");
app.set('views', path.join(__dirname, 'nasa/hubble'));

app
.get('/', (req, res)  => res.render('index') )
.get("/pages/:url", (req, res) =>
    res.status(200).render("pages/" + req.params.url))

app.use(express.static(path.join(__dirname, 'nasa/transbordadores')));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use('/', require('./ovnis/planetas/ruta'));
app.use('/', require('./ovnis/orbitas/ruta'));
app.use('/', require('./ovnis/constelaciones/ruta'));
app.use('/', require('./ovnis/galaxias/ruta'));
app.use('/', require('./ovnis/meteoros/ruta'));
app.use('/', require('./ovnis/satelites/ruta'));


route.route('/bigbang')
    .get(bigbang.ready)

route.route('/blackhole')
    .get(blackhole.alternativa)

app.use('/', route);

app.set('port', (process.env.PORT || 3000));

app.get('/', function(request, response) {
    // response.send('El bigbang exploto');
}).listen(app.get('port'), function() {
    console.log('El bigbang exploto en ', app.get('port'), ' particulas');
});
