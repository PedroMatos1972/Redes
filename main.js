var express = require('express'),
  fs = require('fs'),
  utils = require('./utils'),
  cp = require('child_process'),
  bodyParser = require('body-parser');


var app = express();

app.use(express.static('./public'));
app.use(bodyParser.json());

app.post('/nginx/reload', function(req, res) {
  var output = cp.spawnSync('/usr/sbin/nginx', ['-s', 'reload'], {
    encoding: 'utf8'
  });

  res.send({
    'status': 'ok',
    'stdout': output.stdout.toString(),
    'stderr': output.stderr.toString(),
  });
});

app.post('/nginx/test', function(req, res) {
  var output = cp.spawnSync('/usr/sbin/nginx', ['-t'], {
    encoding: 'utf8'
  });

  res.send({
    'status': 'ok',
    'stdout': output.stdout.toString(),
    'stderr': output.stderr.toString(),
  });
});

app.post('/host', function(req, res) {
  console.log(req.body);

  var confcontent = utils.prepareConf('simpleproxy', {
    'SERVERNAME': req.body.host,
    'PORT': req.body.port,
    'PROXY': req.body.destination,
    'CACHE': req.body.cache === true ? 'include /etc/nginx/dashboard/cache.conf;' : ''
  });

  fs.writeFile('/etc/nginx/conf.d/' + req.body.host + '.conf', confcontent, function(err) {
    if (err) {
      return res.status(500).send({
        'status': 'failed',
        'message': err
      });
    }
    
    res.send({
      'status': 'created'
    });
  });
});

var port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log('Dashboard listening on port ' + port);
});
