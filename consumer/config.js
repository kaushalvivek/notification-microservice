require('dotenv').config()

exports.aws = {
  region: process.env.AWS_REGION,
  apiVersion: process.env.AWS_API_VERSION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  queueUrls: {
    sms: process.env.SMS_QUEUE_URL,
    firebase: process.env.FIREBASE_QUEUE_URL,
    whatsapp: process.env.WHATSAPP_QUEUE_URL,
    email: process.env.EMAIL_QUEUE_URL
  }
}

exports.twilio = {
  accountSid: process.env.TWILIO_ACCOUNT_SID,
  authToken: process.env.TWILIO_AUTH_TOKEN,
  phone: process.env.TWILIO_PHONE
}

exports.sendGrid = {
  key: process.env.SENDGRID_KEY,
  email: process.env.SENDGRID_EMAIL
}

exports.rate = {
  sms: process.env.SMS_PER_SEC,
  whatsapp: process.env.WHATSAPP_PER_SEC,
  email: process.env.EMAIL_PER_SEC,
}