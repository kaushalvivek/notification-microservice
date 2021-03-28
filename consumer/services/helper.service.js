const config = require('../config')
const { Consumer } = require('sqs-consumer')
const AWS = require('aws-sdk')
const https = require('https')
const Twilio = require('twilio')
const { performance } = require('perf_hooks')
const sendGrid = require('@sendgrid/mail')

sendGrid.setApiKey(config.sendGrid.key)
const msgClient = new Twilio(config.twilio.accountSid, config.twilio.authToken)

AWS.config.update({
  region: config.aws.region,
  accessKeyId: config.aws.accessKeyId,
  secretAccessKey: config.aws.secretAccessKey
})

exports.createConsumer = function (queueUrl, batchSize, handler) {
  return Consumer.create({
    queueUrl: queueUrl,
    batchSize: batchSize,
    handleMessageBatch: handler,
    sqs: new AWS.SQS({
      httpOptions: {
        agent: new https.Agent({
          keepAlive: true
        })
      }
    })
  })
}

exports.sendMessage = async function (message, type) {
  const t0 = performance.now()
  if (type === 'EMAIL'){
    await sendGrid.send(message);
  }
  else{
    await msgClient.messages.create(message)
  }
  const t1 = performance.now()
  console.log(message, `time to send message is : ${t1 - t0} ms`)
}
