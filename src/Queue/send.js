const amqp = require('amqplib/callback_api');
const config = require('./config');

function send (queue, msg) {
    let ansver = new Promise((resolve, reject) => {
        amqp.connect(config.connection, function(error0, connection) {
            if (error0) {
                throw error0;
            }
            connection.createChannel(function(error1, channel) {
                if (error1) {
                    throw error1;
                }

                channel.assertQueue(queue, {
                    durable: true
                });
                channel.sendToQueue(queue, Buffer.from(msg));

            });
            setTimeout(function() {
                connection.close();
            }, 500);
        });
        ansver.then(() => {

        }, () => {

        })
    })

}

module.exports = send;