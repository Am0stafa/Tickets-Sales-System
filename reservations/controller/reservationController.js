import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

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
                category: ticketCategory,
                isHold:false,
                isPurchased:false
                
            }

        })
        
        
        if(tickets.length < ticketQuantity){
            return res.status(400).send({message:"not enough tickets available"})
        }
        
        //! create a timer for 30 mins 
        let currentDateObj = new Date();
        let numberOfMlSeconds = currentDateObj.getTime();
        let addMlSeconds = 38 * 60 * 1000;
        let holdUntil = new Date(numberOfMlSeconds + addMlSeconds)


         
        // create hold table
        const hold = await prisma.hold.create({
            data:{
                "expiresIn":holdUntil
            }
        })
        
        
        //! select from the tickets according to the quantity and category
        const selectedTickets = tickets.slice(0, ticketQuantity);
        const selectedTicketsIds = selectedTickets.map(ticket => ticket.id);
    
        // change the isHold to true for selectedTicketsIds
        await prisma.ticket.updateMany({
            where:{
                id:{
                    in:selectedTicketsIds
                }
            },
            data:{
                isHold:true,
                holdId:hold.id
            }
        })
        
        
        res.status(200).send({tickets: hold.id, holdUntil: holdUntil})
        
    } catch (error) {
        console.log(error)
    }

}

const purchased = async (req, res, next) => {
/*
    get the user and the hold table
    1) check that the time is still valid DONE
    2) create an order table with the user id 
    3) get the tickets from the hold table DONE
    4) update the tickets to be purchased true DONE
    5) along with adding the order table id to the tickets
*/
    try {
        const user = req.body.user;
        const holdId = req.body.id;

        const hold = await prisma.hold.findUnique({
            where:{
                id: holdId,
            },
            include:{
                tickets: true
            }
        })
        
        const time = hold.expiresIn >= Date.now()
        if (!time) res.status(400).send({message: 'time has passed'})
        
        //CREATE AND ORDER
        
        
        const tickets = await prisma.ticket.updateMany({
            where: {
                holdId:hold.id
            },
            data: {
                isPurchased:true,
                // ORDER ID
            }
        })
        

        
        
        
        return res.status(200).send({tickets})
        
        
        
    } catch (error) {
        console.log(error)
    }
        
}


export default { addTicketToCart,purchased  };