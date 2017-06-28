const speedTest = require('speedtest-net');
const test = speedTest({maxTime: 5000, pingCount: 10});

speedTest.visual({maxTime: 5000, log: true}, (err, data) => {
  console.dir(data);
});
// test.on('data', data => {
//   console.dir(data);
// });

// test.on('config', (config) => {
//   console.log('Configuration info:');
//   console.dir(config);
// });

// test.on('error', err => {
//   console.error(err);
// });

// test.on('testserver', server => {
//   console.log('Test server:');
//   console.dir(server);
// });

// test.on('done', data => {
//     console.log('The speed test has completed successfully.');
//     console.dir(data);
// })
// let down = [];
// test.on('data', data => {
//     console.log('The speed test has completed successfully - data.');
//     console.dir(data);
//     console.log('itens: ');
//     console.log(down)
// })

// test.on('downloadspeedprogress', speed => {
//     down.push(speed);
//   //console.log('Download speed (in progress):', (speed * 125).toFixed(2), 'KB/s');
// });

// test.on('done', dataOverload => {
//   console.log('TL;DR:');
//   console.dir(dataOverload);
//   console.log('The speed test has completed successfully.');
// });