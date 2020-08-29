const AWS = require('aws-sdk')

const sqs = new AWS.SQS({
    region: 'ap-southeast-2'
})

const proms = []
for(let i = 0; i < 20; i++) {
    const params = {
        MessageBody: JSON.stringify({ id: i }),
        QueueUrl: 'https://sqs.ap-southeast-2.amazonaws.com/355151872526/throttle.fifo',
        // DelaySeconds: 10, using fifo queue, DelaySeconds must be set on queue, not on message
        MessageDeduplicationId: i.toString()
    }
    proms.push(sqs.sendMessage(params).promise())
}
Promise.all(proms)
.then(r => {
    console.log('sent all', r.length)
})
.catch(e => {
    console.error(e)
})