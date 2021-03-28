const config = require('../config')
const RateLimiter = require('limiter').RateLimiter;

const whatsappLimiter = new RateLimiter(config.rate.whatsapp ? config.rate.whatsapp : 20, 'second');
const smsLimiter = new RateLimiter(config.rate.sms ? config.rate.sms : 20, 'second');
const emailLimiter = new RateLimiter(config.rate.email ? config.rate.email : 20, 'second');


exports.sms = async function (messages) {
  try {
    for (const message of messages) {
      const extractedMsg = JSON.parse(message.Body)
      extractedMsg.targets.forEach(function (target) {
          const msg = {
            body: extractedMsg.content.body,
            to: `${target.countryCode}${target.phone}`,
            from: `${config.twilio.phone}`
          }
          smsLimiter.removeTokens(1, helper.sendMessage(msg, 'SMS'));
      })
    }
    return;
  } catch (e) {
    throw new Error(e.message)
  }
}

exports.email = async function (messages) {
  try {
    for (const message of messages) {
      const extractedMsg = JSON.parse(message.Body)
      extractedMsg.targets.forEach( function (target) {
          const msg = {
            subject: extractedMsg.content.subject,
            html: extractedMsg.content.html,
            to: target,
            from: `${config.sendGrid.email}`
          }
          emailLimiter.removeTokens(1, helper.sendMessage(msg, 'EMAIL'));
      })
    }
    return;
  } catch (e) {
    throw new Error(e.message)
  }
}

exports.whatsapp = async function (messages) {
  try {
    for (const message of messages) {
      const extractedMsg = JSON.parse(message.Body)
      extractedMsg.targets.forEach(async function (target) {
          const msg = {
            body: extractedMsg.content.body,
            to: `whatsapp:${target.countryCode}${target.phone}`,
            from: `whatsapp:${config.twilio.phone}`
          }
          whatsappLimiter.removeTokens(1, helper.sendMessage(msg, 'WHATSAPP'));
      })
    }
    return;
  } catch (e) {
    throw new Error(e.message)
  }
}
