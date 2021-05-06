const amqp = require('amqplib/callback_api');
const config = require('./config');

/**
 * Get one message from queue
 *
 * @param queue
 */
function receive (queue, callback, count) {
    if (!queue) {
        throw 'empty queue';
    }
    amqp.connect(config.connection, function(error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function(error1, channel) {
            if (error1) {
                throw error1;
            }

            channel.assertQueue(queue, {
                durable: false
            });

            console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

            channel.consume(queue, function(msg) {
                callback(msg.content.toString())
            }, {
                noAck: true
            });
        });
    });
    return amqp;
}

module.exports = receive;