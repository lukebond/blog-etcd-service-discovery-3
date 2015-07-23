var pkgjson = require('./package.json'),
    path = require('path'),
    Etcd = require('node-etcd');

var etcd = new Etcd();

function etcdDiscover(name, options, callback) {
  etcd.get(path.posix.join('/', 'services', name), options, function (err, value) {
    if (err) {
      return callback(err);
    }
    var value = JSON.parse(value.node.value);
    return callback(null, value);
  });
}

console.log(pkgjson.name + ' is looking for \'myservice\'...');
etcdDiscover('myservice', {wait: false}, function (err, node) {
  if (err) {
    console.log(err.message);
    process.exit(1);
  }
  console.log(pkgjson.name + ' discovered node: ', node);
  setInterval(function () {}, 10000); // keep app alive
});
