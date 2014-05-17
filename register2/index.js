var pkgjson = require('./package.json'),
    path = require('path'),
    Etcd = require('node-etcd');

var etcd = new Etcd();

function etcdRegister() {
  var p = path.join('/', 'services', 'myservice');
  etcd.set(p,
    JSON.stringify({
        hostname: '127.0.0.1',
        port: '3000',
        pid: process.pid,
        name: pkgjson.name
      }),
    {
      ttl: 10
    });
  setTimeout(etcdRegister, 5000);
  return p;
}

console.log(pkgjson.name + ' registered with etcd as ' + etcdRegister());
