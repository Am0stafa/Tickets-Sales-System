require('dotenv').config();
const { isEmpty } = require('lodash');
const { Kafka } = require('kafkajs')
const validate = require('../validation/kafka');
const messages = require('../constants/messages');
const shopProcessor = require('../processors/shop');

const kafka = new Kafka({
  clientId: `${process.env.CLIENT_ID}-${process.env.ENV}`,
  brokers: [process.env.KAFKA_BROKERS],
  ssl: true,
  logLevel: 2,
  sasl: {
    mechanism: 'plain',
    username: process.env.KAFKA_SASL_USERNAME,
    password: process.env.KAFKA_SASL_PASSWORD
  },
});

const topic = `${process.env.TOPIC_FIFA_TICKET_SALES}-${process.env.ENV}`;
const consumer = kafka.consumer({ groupId: `${process.env.GROUP_ID}-${process.env.ENV}` });

const startKafkaConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic, fromBeginning: true });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      try {
        // Deserialize message body
        const parsedMessage = JSON.parse(message.value);
        if (isEmpty(parsedMessage)) {
          console.log('cannot process empty message')
          return;
        }

        // process message if there is no validation error
        const validationError = validate.kafkaMessage(parsedMessage);
        if (!isEmpty(validationError)) {
          console.log('cannot process message with validation error:', validationError.message)
          return;
        }

        // determine which processor to call
        const messageType = parsedMessage.meta.action;
        const processMessage = {
          [messages.TICKET_PENDING]: shopProcessor.processPendingTicket,
          [messages.TICKET_RESERVED]: shopProcessor.processReservedTicket,
          [messages.TICKET_CANCELLED]: shopProcessor.processCancelledTicket,
        }[messageType];      

        // call the processor
        await processMessage(parsedMessage);
      } catch (e) {
        console.log('Unable to process message');
      }
    },
  });
};

module.exports = {
  startKafkaConsumer,
};