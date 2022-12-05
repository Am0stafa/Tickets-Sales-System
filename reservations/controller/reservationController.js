import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const addTicketToCart = async (req, res, next) => {
/*
expect to receive matchId, ticket quantity and category then:
    1) check for tickets availability
    2) get a ticket and hold it by placing it into hold table for 30 mins
    3) make a serverless function that will run after 30 mins to check if the ticket is still in the hold table if true replace it in the tickets table , if false just remove it
    4) return the id of the ticket in the hold table and time in utc
*/

    try {
        //! check for ticket availability
        const matchId = req.body.matchId;
        const ticketQuantity = parseInt(req.body.ticketQuantity);
        const ticketCategory = req.body.ticketCategory;
        

        const tickets = await prisma.ticket.findMany({
            where:{
                matchId: parseInt(matchId),
                category: ticketCategory
            }

        })
        
        if(tickets.length < ticketQuantity){
            return res.status(400).send({message:"not enough tickets available"})
        }
        
        //! select from the tickets according to the quantity and category
        const selectedTickets = tickets.slice(0, ticketQuantity);
        const selectedTicketsIds = selectedTickets.map(ticket => ticket.id);
    
        //! delete the selected tickets from the tickets table
        const deletedTickets = await prisma.ticket.deleteMany({
            where: {
                id: {
                    in: selectedTicketsIds
                }
            }
        });
    
    
        //! create a timer for 30 mins 
        const holdUntil = new Date() + 30 * 60 * 1000;
        
        //! insert the selected tickets into the hold table along with the timer
        // const holdTickets = await prisma.holdTicket.createMany({
        //     data:selectedTickets
        // });
        
        // TODO: array of tickets and timer
        
        //! return the new record id and the timer
        
        res.status(200).send({tickets: selectedTickets, holdUntil: holdUntil})
        
    } catch (error) {
        console.log(error)
    }

}


export default { addTicketToCart  };