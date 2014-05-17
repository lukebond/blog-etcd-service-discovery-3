var path = require('path'),
    Etcd = require('node-etcd');

var etcd = new Etcd();

var p = path.join('/', 'services', 'myservice');
etcd.set(p,
  JSON.stringify({
    hostname: '127.0.0.1',
    port: '3000',
    pid: process.pid
  }));
console.log('Registered with etcd as ' + p);
