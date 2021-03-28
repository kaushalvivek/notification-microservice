const aws = require('aws-sdk')
const uuid = require('uuid')
const splitArray = require('split-array')
const config = require('../../config')

const sqsConfig = {
  apiVersion: config.aws.apiVersion,
  accessKeyId: config.aws.accessKeyId,
  secretAccessKey: config.aws.secretAccessKey,
  region: config.aws.region
}
aws.config.update(sqsConfig)

const sqs = new aws.SQS({ apiVersion: config.aws.apiVersion })

exports.queueMessages = async function (messages, queueUrl) {
  try {
    const splittedArray = splitArray(messages, 10)
    for (const arr of splittedArray) {
      const params = {
        QueueUrl: queueUrl,
        Entries: []
      }
      arr.forEach(message => {
        params.Entries.push({
          Id: uuid.v4(),
          MessageBody: JSON.stringify(message)
        })
      })
      await sqs.sendMessageBatch(params).promise()
    };
    return (201)
  } catch (e) {
    throw new Error(e.message)
  }
}
