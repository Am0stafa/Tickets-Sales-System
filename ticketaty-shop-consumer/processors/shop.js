const axios = require('axios'); 

const processPendingTicket = async (message) => {

  console.log('[processPendingTicket]', message)
  return Promise.resolve('[processPendingTicket]')
};

const processReservedTicket = async (message) => {

  console.log('[processReservedTicket]', message)
  return Promise.resolve('[processReservedTicket]')
};

const processCancelledTicket = async (message) => {

  console.log('[processCancelledTicket]', message)
  return Promise.resolve('[processCancelledTicket]')
};


module.exports = {
  processPendingTicket,
  processReservedTicket,
  processCancelledTicket
};
