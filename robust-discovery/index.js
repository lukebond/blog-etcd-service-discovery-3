var pkgjson = require('./package.json'),
    path = require('path'),
    Etcd = require('node-etcd');

var etcd = new Etcd();

function etcdDiscover(name, options, callback) {
  var key = path.posix.join('/', 'services', name);
  etcd.get(key, options, function (err, value) {
    if (err) {
      return callback(err);
    }
    var value = JSON.parse(value.node.value);
    return callback(null, value, etcd.watcher(key));
  });
}

console.log(pkgjson.name + ' is looking for \'myservice\'...');
etcdDiscover('myservice', {wait: false}, function (err, node, watcher) {
  if (err) {
    console.log(err.message);
    process.exit(1);
  }
  console.log(pkgjson.name + ' discovered node: ', node);
  watcher
    .on('change', function (data) {
      console.log('Value changed; new value: ', data.node);
    })
    .on('expire', function (data) {
      console.log('Value expired.');
    })
    .on('delete', function (data) {
      console.log('Value deleted.');
    });
});
