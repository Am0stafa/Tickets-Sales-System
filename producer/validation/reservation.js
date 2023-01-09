const Joi = require('@hapi/joi');
const { tickets } = require('./shared-schema');

const reservationValidation = {
  /**
  * Validate create new ticket reservation data transfer object (DTO)
  * @return null if validation passes otherwise a validation error
  */
  validateTicketReservationDto(reservation) {//changed
    const schema = Joi.object().keys({
      matchNumber: Joi.number().strict().required(),
      tickets,
      clientId: Joi.string()
    }).required().unknown(false);
    return schema.validate(reservation).error;
  },

};

module.exports = reservationValidation;