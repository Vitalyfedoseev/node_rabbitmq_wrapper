const Send = require('./send');
const Receive = require('./receive');
const Worker = require('./worker');

/**
 * Common access point to rabbit
 */
class Queue {
    constructor() {
        this.Send = Send;
        this.Receive = Receive;
        this.Worker = Worker;
    }

    /**
     *
     * @param queue
     * @param msg
     * @returns {void|boolean}
     */
    send (queue, msg) {
        let result;
        try {
            result =  this.Send(queue, msg);
        } catch (error) {
            result = false;
        }
        return result
    }

    /**
     *
     * @param queue
     * @param callback
     * @param count
     * @returns {{connect?: function(*=, *=, *): void, credentials?: {plain?: function(*=, *=): {password: *, response: function(): *, mechanism: string, username: *}, amqplain?: function(*=, *=): {password: *, response: function(): *, mechanism: string, username: *}, external?: function(): {response: function(): *, mechanism: string}}, IllegalOperationError?: function(*, *): void}|boolean}
     */
    receive (queue, callback, count) {
        let result;
        try {
            result = this.Receive(queue);
        } catch (error) {
            result = false;
        }
        return result
    }

    /**
     *
     * @param queue
     * @param callback
     * @returns {{connect?: function(*=, *=, *): void, credentials?: {plain?: function(*=, *=): {password: *, response: function(): *, mechanism: string, username: *}, amqplain?: function(*=, *=): {password: *, response: function(): *, mechanism: string, username: *}, external?: function(): {response: function(): *, mechanism: string}}, IllegalOperationError?: function(*, *): void}|boolean}
     */
    worker (queue, callback) {
        let result;
        try {
            result = this.Worker(queue);
        } catch (error) {
            result = false;
        }
        return result
    }
}

module.exports = Queue;