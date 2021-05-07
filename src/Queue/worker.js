const amqp = require('amqplib/callback_api');
const config = require('./config');

function worker (queue, callback) {
    amqp.connect(config.connection, function(error, connection) {
        connection.createChannel(function(error, channel) {

            channel.assertQueue(queue, {
                durable: true, noAck: false
            });
            channel.prefetch(1);
            channel.consume(queue, function(msg) {
                let secs = msg.content.toString().split('.').length - 1;
                callback(msg.content.toString()); // handler
                setTimeout(function() {
                    channel.ack(msg);
                }, secs * 1000);
            }, {
                noAck: false
            });
        });
    });
    return amqp;
}

module.exports = worker;

