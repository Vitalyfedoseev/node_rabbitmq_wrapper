const rabbit = require('./Queue/index');

let queue = new rabbit();
console.log(queue);
// queue.send('test', '11rr3')
queue.receive('test');