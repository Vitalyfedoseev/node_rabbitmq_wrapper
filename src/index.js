const rabbit = require('./Queue/index');

let queue = new rabbit();
queue.send('test', '11rr3')

// queue.worker('test', (msg) => {
//     console.log(msg);
// });