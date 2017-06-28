const async = require('async');
const speedTest = require('speedtest-net');
const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.use('/static', express.static(__dirname + '/public'));
app.get('/', function(req, res){
    res.render('pages/index'); 
});

app.get('/api/teste', function(req, res){
    var itens = [
       [1,  37.8, 80.8],
        [2,  30.9, 69.5],
        [3,  25.4,   57],
        [4,  11.7, 18.8],
        [5,  11.9, 17.6],
        [6,   8.8, 13.6],
        [7,   7.6, 12.3],
        [8,  12.3, 29.2],
        [9,  16.9, 42.9],
        [10, 12.8, 30.9]
      ];

    var itens2 = [
       [1,  37.8],
        [2,  30.9],
        [3,  25.4],
        [4,  11.7],
        [5,  37.8],
        [6,  30.9],
        [7,  25.4],
        [8,  11.7],
        [9,  37.8],
        [10,  30.9],
      ];
    
    let r = {};
    r.down = itens;
    r.ping = itens2;
    res.json(r)
});

var calls = [];

app.get('/api/iniciar', function(req, res){
    

    var itensTcp = [];
    var itensPing = [];

    // [1,2].forEach(function(i){
    //     calls.push(function(callback) {
    //         test.on('data', data => {
    //             console.log(data);
    //             const item = [];
    //             item.push(i);
    //             item.push(data.speeds.download);
    //             item.push(data.speeds.upload);
    //             itensTcp.push(item);
    //             //callback(null, i);
    //         });
    //     });
        
    // });
    let options = {maxTime: 5000, pingCount: 10};
    async.parallel({
        one: function(callback) {
            const test = speedTest(options);
            test.on('data', data => {
                const tcp = [1, data.speeds.download, data.speeds.upload];
                const ping = [1, data.server.ping];
                const item = {};
                const dadosConexao = data.client;
                item.tcp = tcp;
                item.ping = ping;
                item.dadosConexao = dadosConexao;
                callback(null, item);
            });
        },
        two: function(callback) {
            const test = speedTest(options);
            test.on('data', data => {
                const tcp = [2, data.speeds.download, data.speeds.upload];
                const ping = [2, data.server.ping];
                const item = {};
                item.tcp = tcp;
                item.ping = ping;
                callback(null, item);
            });
        },
        three: function(callback) {
            const test = speedTest(options);
            test.on('data', data => {
                const tcp = [3, data.speeds.download, data.speeds.upload];
                const ping = [3, data.server.ping];
                const item = {};
                item.tcp = tcp;
                item.ping = ping;
                callback(null, item);
            });
        },
        four: function(callback) {
            const test = speedTest(options);
            test.on('data', data => {
                const tcp = [4, data.speeds.download, data.speeds.upload];
                const ping = [4, data.server.ping];
                const item = {};
                item.tcp = tcp;
                item.ping = ping;
                callback(null, item);
            });
        },
        five: function(callback) {
            const test = speedTest(options);
            test.on('data', data => {
                const tcp = [5, data.speeds.download, data.speeds.upload];
                const ping = [5, data.server.ping];
                const item = {};
                item.tcp = tcp;
                item.ping = ping;
                callback(null, item);
            });
        },
        six: function(callback) {
            const test = speedTest(options);
            test.on('data', data => {
                const tcp = [6, data.speeds.download, data.speeds.upload];
                const ping = [6, data.server.ping];
                const item = {};
                item.tcp = tcp;
                item.ping = ping;
                callback(null, item);
            });
        },
        seven: function(callback) {
            const test = speedTest(options);
            test.on('data', data => {
                const tcp = [7, data.speeds.download, data.speeds.upload];
                const ping = [7, data.server.ping];
                const item = {};
                item.tcp = tcp;
                item.ping = ping;
                callback(null, item);;
            });
        },
        eight: function(callback) {
            const test = speedTest(options);
            test.on('data', data => {
                const tcp = [8, data.speeds.download, data.speeds.upload];
                const ping = [8, data.server.ping];
                const item = {};
                item.tcp = tcp;
                item.ping = ping;
                callback(null, item);
            });
        },
        nine: function(callback) {
            const test = speedTest(options);
            test.on('data', data => {
                const tcp = [9, data.speeds.download, data.speeds.upload];
                const ping = [9, data.server.ping];
                const item = {};
                item.tcp = tcp;
                item.ping = ping;
                callback(null, item);
            });
        },
        ten: function(callback) {
            const test = speedTest(options);
            test.on('data', data => {
                const tcp = [10, data.speeds.download, data.speeds.upload];
                const ping = [10, data.server.ping];
                const item = {};
                item.tcp = tcp;
                item.ping = ping;
                callback(null, item);
            });
        }
    }, function(err, results) {
        // results is now equals to: {one: 1, two: 2}
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
app.listen(8080, '192.168.20.22');
console.log('8080 is the magic port');