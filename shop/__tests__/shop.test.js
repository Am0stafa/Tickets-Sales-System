import request from 'supertest';
import app from '../app';
// const availability = require('../availability');
import shopController from '../controller/shopController';
const prisma = require('../prisma');
jest.mock('../prisma');


describe('GET /api/shop/matches', () => {
  it('should return all matches', async () => {
    const res = await request(app).get('/api/shop/matches');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status', 'success');
    expect(res.body).toHaveProperty('data.allMatches');
  });

  it('should return a slice of matches based on page and limit query params', async () => {
    const res = await request(app).get('/api/shop/matches?page=2&limit=10');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status', 'success');
    expect(res.body).toHaveProperty('data.filteredData');
  });

  it('should return all matches if page or limit query params are invalid', async () => {
    const res = await request(app).get('/api/shop/matches?page=invalid&limit=10');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status', 'success');
    expect(res.body).toHaveProperty('data.allMatches');

    const res2 = await request(app).get('/api/shop/matches?page=2&limit=invalid');
    expect(res2.statusCode).toEqual(200);
    expect(res2.body).toHaveProperty('status', 'success');
    expect(res2.body).toHaveProperty('data.allMatches');
  });
});

// describe('availability', () => {
//     it('should return ticket availability information for a given match ID', async () => {
//       prisma.ticket.findMany.mockImplementation(() => [
//         { matchId: 123, isHold: false, isPurchased: false },
//         { matchId: 123, isHold: false, isPurchased: false },
//         { matchId: 123, isHold: false, isPurchased: false },
//         { matchId: 123, isHold: false, isPurchased: false },
//         { matchId: 123, isHold: false, isPurchased: false },
//         { matchId: 123, isHold: true, isPurchased: false },
//         { matchId: 123, isHold: true, isPurchased: false },
//         { matchId: 123, isHold: false, isPurchased: true },
//         { matchId: 123, isHold: false, isPurchased: true },
//         { matchId: 123, isHold: false, isPurchased: true }
//       ]);
  
//       const res = await availability(123);
//       expect(res).toEqual({
//         matchId: 123,
//         status: 'Available',
//         numOfTickets: 10,
//         numOfHold: 2,
//         numOfSold: 3,
//         numOfAvailable: 5
//       });
//     });
//     it('should return "Temporarily Unavailable" if there are no tickets but there are holds', async () => {
//         prisma.ticket.findMany.mockImplementation(() => [
//           { matchId: 789, isHold: true, isPurchased: false },
//           { matchId: 789, isHold: true, isPurchased: false },
//           { matchId: 789, isHold: true, isPurchased: false },
//           { matchId: 789, isHold: true, isPurchased: false },
//           { matchId: 789, isHold: true, isPurchased: false }
//         ]);
    
//         const res = await availability(789);
//         expect(res).toEqual({
//           matchId: 789,
//           status: 'Temporarily Unavailable',
//           numOfHold: 5
//         });
//       });
//       it('should return all ticket availability information if all flag is set to true', async () => {
//         prisma.ticket.findMany.mockImplementation(() => [
//           { matchId: 123, isHold: false, isPurchased: false },
//           { matchId: 123, isHold: false, isPurchased: false },
//           { matchId: 123, isHold: false, isPurchased: false },
//           { matchId: 123, isHold: false, isPurchased: false },
//           { matchId: 123, isHold: false, isPurchased: false },
//           { matchId: 123, isHold: true, isPurchased: false },
//           { matchId: 123, isHold: true, isPurchased: false },
//           { matchId: 123, isHold: false, isPurchased: true },
//           { matchId: 123, isHold: false, isPurchased: true },
//           { matchId: 123, isHold: false, isPurchased: true }
//         ]);
    
//         const res = await availability(123, true);
//         expect(res).toEqual({
//           matchId: 123,
//           status: 'Available',
//           numOfAvailable: 5
//         });
//       });
//       it('should return an error message if there is an issue fetching ticket data', async () => {
//         prisma.ticket.findMany.mockImplementation(() => {
//           throw new Error('Error fetching ticket data');
//         });
    
//         const res = await availability(123);
//         expect(res).toEqual({
//           message: 'Error fetching ticket data'
//         });
//       });
//     });