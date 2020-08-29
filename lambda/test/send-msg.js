const AWS = require('aws-sdk')

const sqs = new AWS.SQS({
    region: 'ap-southeast-2'
})

// fifo didnt have quite the throttling I wanted
// maybe I didnt set it right but anyway
// try another thing
// yeah this is really nice!
// havent got an issue with duplicates either

const proms = []
const d = Date.now()
for(let i = 0; i < 20; i++) {
    const params = {
        MessageBody: JSON.stringify({ id: i }),
        QueueUrl: 'https://sqs.ap-southeast-2.amazonaws.com/355151872526/throttle-reg',
        DelaySeconds: i,
        // MessageDeduplicationId: i.toString(),
        // MessageGroupId: d.toString()
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