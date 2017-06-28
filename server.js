const async = require('async');
const speedTest = require('speedtest-net');
const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.use('/static', express.static(__dirname + '/public'));
app.get('/', function(req, res){
    res.render('pages/index'); 
});

app.get('/api/iniciar', function(req, res){    

    var itensTcp = [];
    var itensPing = [];

    let options = {maxTime: 5000, pingCount: 10};
    async.parallel({
        one: function(callback) {
            const test = speedTest(options);
            test.on('data', data => {
                const item = formatCallback(1, data);
                const dadosConexao = data.client;
                item.dadosConexao = dadosConexao;
                callback(null, item);
            });
        },
        two: function(callback) {
            const test = speedTest(options);
            test.on('data', data => {
                const item = formatCallback(2, data);
                callback(null, item);
            });
        },
        three: function(callback) {
            const test = speedTest(options);
            test.on('data', data => {
                const item = formatCallback(3, data);
                callback(null, item);
            });
        },
        four: function(callback) {
            const test = speedTest(options);
            test.on('data', data => {
                const item = formatCallback(4, data);
                callback(null, item);
            });
        },
        five: function(callback) {
            const test = speedTest(options);
            test.on('data', data => {
                const item = formatCallback(5, data);
                callback(null, item);
            });
        },
        six: function(callback) {
            const test = speedTest(options);
            test.on('data', data => {
                const item = formatCallback(6, data);
                callback(null, item);
            });
        },
        seven: function(callback) {
            const test = speedTest(options);
            test.on('data', data => {
                const item = formatCallback(7, data);
                callback(null, item);
            });
        },
        eight: function(callback) {
            const test = speedTest(options);
            test.on('data', data => {
                const item = formatCallback(8, data);
                callback(null, item);
            });
        },
        nine: function(callback) {
            const test = speedTest(options);
            test.on('data', data => {
                const item = formatCallback(9, data);
                callback(null, item);
            });
        },
        ten: function(callback) {
            const test = speedTest(options);
            test.on('data', data => {
                const item = formatCallback(10, data);
                callback(null, item);
            });
        }
    }, function(err, results) {        
        itensTcp.push(results.one.tcp);
        itensTcp.push(results.two.tcp);
        itensTcp.push(results.three.tcp);
        itensTcp.push(results.four.tcp);
        itensTcp.push(results.five.tcp);
        itensTcp.push(results.six.tcp);
        itensTcp.push(results.seven.tcp);
        itensTcp.push(results.eight.tcp);
        itensTcp.push(results.nine.tcp);
        itensTcp.push(results.ten.tcp);

        itensPing.push(results.one.ping);
        itensPing.push(results.two.ping);
        itensPing.push(results.three.ping);
        itensPing.push(results.four.ping);
        itensPing.push(results.five.ping);
        itensPing.push(results.six.ping);
        itensPing.push(results.seven.ping);
        itensPing.push(results.eight.ping);
        itensPing.push(results.nine.ping);
        itensPing.push(results.ten.ping);
        let r = {};
        r.down = itensTcp;
        r.ping = itensPing;
        r.dadosConexao = results.one.dadosConexao;
        res.json(r);
    });    


    
});
app.listen(8080);
console.log('8080 is the magic port');

function formatCallback(i, data) {
    const tcp = [i, data.speeds.download, data.speeds.upload];
    const ping = [i, data.server.ping];
    const item = {};
    item.tcp = tcp;
    item.ping = ping;
    return item;
}