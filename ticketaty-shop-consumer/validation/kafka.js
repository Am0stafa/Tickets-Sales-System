const Joi = require('@hapi/joi'); //changed all
const messages = require('../constants/messages');

// pending/reserved message body
const messageBody = Joi.object().keys({
  matchNumber: Joi.number().required(),
  tickets: Joi.array().items(
    Joi.object().keys({
      category: Joi.number().strict().valid(1, 2, 3).required(),
      quantity: Joi.number().strict().min(1).max(2).required(),
      price: Joi.number().strict().valid(75, 125, 195).required(),
    }).required()
  ).required().min(1).max(2),
  clientId: Joi.string(),
}).unknown(false);

const kafkaMessageValidation = {
  /**
  * Validate schema for pending/reserved ticket
  * @return null if validation passes otherwise a validation error
  */
  kafkaMessage(reservation) {
    var schema = Joi.object().keys({
      meta: Joi.object().keys({
        action: Joi.string().valid(messages.TICKET_RESERVED, messages.TICKET_PENDING,messages.TICKET_CANCELLED).required(),
      }).unknown(false),
      body: messageBody,
    }).required();
    return schema.validate(reservation).error;
  },
};

module.exports = kafkaMessageValidation;