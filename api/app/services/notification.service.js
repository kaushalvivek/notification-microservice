
const config = require('../../config')
const helper = require('./helper.service')

exports.email = async function (data) {
  try {
    const messages = []
    data.forEach(item => {
      if (!(item.content && item.targets && item.content.html && item.content.subject)) {
        throw new Error('Invalid request format, check API documentation.')
      };
      messages.push(item)
    })
    console.log(JSON.stringify(messages))
    await helper.queueMessages(messages, config.aws.queueUrls.email)
  } catch (e) {
    throw new Error(e.message)
  }
}

exports.whatsapp = async function (data) {
  try {
    const messages = []
    data.forEach(item => {
      if (!(item.content && item.targets && item.content.body)) {
        throw new Error('Invalid request format, check API documentation.')
      };
      item.targets.forEach(target => {
        if (!(target.countryCode && target.phone)) {
          throw new Error('Invalid request format, check API documentation.')
        }
        if (isNaN(target.phone) || isNaN(target.countryCode.substring(1))) {
          throw new Error(`Invalid phone number in ${target}`)
        }
      })
      messages.push(item)
    })
    console.log(JSON.stringify(messages))
    await helper.queueMessages(messages, config.aws.queueUrls.whatsapp)
  } catch (e) {
    throw new Error(e.message)
  }
}

exports.sms = async function (data) {
  try {
    const messages = []
    data.forEach(item => {
      if (!(item.content && item.targets && item.content.body)) {
        throw new Error('Invalid request format, check API documentation.')
      };
      item.targets.forEach(target => {
        if (!(target.countryCode && target.phone)) {
          throw new Error('Invalid request format, check API documentation.')
        }
        if (isNaN(target.phone) || isNaN(target.countryCode.substring(1))) {
          throw new Error('Invalid phone number or country code')
        }
      })
      messages.push(item)
    })
    console.log(JSON.stringify(messages))
    await helper.queueMessages(messages, config.aws.queueUrls.sms)
  } catch (e) {
    throw new Error(e.message)
  }
}
