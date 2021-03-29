# Notification Microservice

![https://img.shields.io/badge/version-v1.0.0-green](https://img.shields.io/badge/version-v1.0.0-green)

## Introduction

This project is a highly scalable micro-service to handle all the notifications (Email/SMS/WhatsApp) that you would require to schedule for contact from your small-business. It uses Amazon's SQS queuing service, SendGrid's email API and Twilio WhatsApp and SMS API to schedule notifications. Support would be added for other service-providers as the project evolves.

## Features

- Simple/Bulk WhatsApp notification through a single API call.
- Simple/Bulk SMS notification through a single API call.
- Simple/Bulk rich text Email through a single API call.
- Rate limiter for streamlining bulk notification requests.

## QuickStart
- [Setup SendGrid](https://sendgrid.com/solutions/email-api/) and generate an API key
- [Setup Twilio](https://www.twilio.com/docs/usage/tutorials/how-to-use-your-free-trial-account), register a number, generate API key and setup SMS and WhatsApp.
- [Setup SQS](https://vivekkaushal.com/node-sqs/)
- [Install Docker](https://docs.docker.com/engine/install/)
- Clone this project
```bash
git clone https://github.com/kaushalvivek/notification-microservice.git
cd notification-microservice
```
- Create environment file
```bash
vim .env
```
Provide all the values as specified in `sample_env.sh`
- Start the micro-service
```
sudo docker-compose up -d
```

## Usage

### Sending Emails
POST request to : `host:PORT/api/v1/notify/email`  
Request body:
```json
{
    "data":[
        {
            "content":{
                "subject" : "Sample Email's Subject",
                "html" : "<p> Sample email's body</p>"
            },
            "targets":[
                "email1@foo.bar",
                "email2@boo.bar"
            ]
        }
         {
            "content":{
                "subject" : "Sample Email 2's Subject",
                "html" : "<p> Sample email 2's body</p>"
            },
            "targets":[
                "email3@foo.bar"
            ]
        }
    ]
}

```

### Sending WhatsApp messages
POST request to : `host:PORT/api/v1/notify/whatsapp`  
Request body:
```json
{
    "data":[
        {
            "content":{
                "body" : "This is a sample message!"
            },
            "targets":[
                {
                    "countryCode":"+1",
                    "phone":"123456789"
                },
                {
                    "countryCode":"+91",
                    "phone":"9876543211"
                }
            ]
        }
        {
            "content":{
                "body" : "This is another sample message!"
            },
            "targets":[
                {
                    "countryCode":"+1",
                    "phone":"123456789"
                }
            ]
        }
    ]
}

```


### Sending SMS
POST request to : `host:PORT/api/v1/notify/sms`  
Request body:
```json
{
    "data":[
        {
            "content":{
                "body" : "This is a sample message!"
            },
            "targets":[
                {
                    "countryCode":"+1",
                    "phone":"123456789"
                },
                {
                    "countryCode":"+91",
                    "phone":"9876543211"
                }
            ]
        }
        {
            "content":{
                "body" : "This is another sample message!"
            },
            "targets":[
                {
                    "countryCode":"+1",
                    "phone":"123456789"
                }
            ]
        }
    ]
}

```

## Contributing
Feel free to create issues in this repository for contribution. Contributions guidelines would evolve along with the project. Tests for integration would be added soon.

## License

[MIT License](https://raw.githubusercontent.com/kaushalvivek/notification-microservice/main/LICENSE) 

Copyright (c) 2021 Vivek Kaushal
