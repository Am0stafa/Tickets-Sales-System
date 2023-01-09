const Joi = require('@hapi/joi');

exports.tickets = Joi.array().items(
  Joi.object().keys({
    category: Joi.number().strict().valid(1, 2, 3).required(),
    quantity: Joi.number().strict().min(1).max(2).required(),
    price: Joi.number().strict().valid(75, 125, 195).required(),
  }).required()
).required().min(1).max(2);//changed
