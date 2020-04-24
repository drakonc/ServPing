var ping = require('ping');

var hosts = ['192.168.200.37', '192.168.200.39', '192.168.200.10', '192.168.200.50', '192.168.200.4',
    '192.168.200.40', '192.168.200.36'];

async function isPing() {
    for (let host of hosts) {
        let res = await ping.promise.probe(host);
        let isAlive = res.alive
        var msg = isAlive ? 'host ' + res.host + ' time = ' + res.time + ' is ' + isAlive : 'host ' + host + ' time = ' + res.time + ' is ' + isAlive;
        console.log(msg);
    }
}
console.log('Realizando Ping...')
isPing()