import { PrismaClient } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid';
const prisma = new PrismaClient()


const addTicketToCart = async (req, res, next) => {
/*
expect to receive matchId, ticket quantity and category then:
    1) check for tickets availability
    2) get a ticket and hold it by placing it into hold table for 30 mins
    3) TODO: make a serverless function that will run after 30 mins to check if the ticket is still in the hold table if true replace it in the tickets table , if false just remove it
    4) TODO: produce a kafka broker that a ticket is pending
    5) return the id of the ticket in the hold table and time in utc
*/
    try {
        const matchId = req.body.matchId;
        const quantity = req.body.tickets; // where this is an array of objects [{category: 'Category 4', quantity: 2}, {category: 'Category 2', quantity: 3} ....]
        const totalTicketQuantity = quantity.reduce((acc, cur) => acc + cur.quantity, 0);

        const tickets = await prisma.ticket.findMany({
            where:{
                matchId: matchId,
                isHold: false,
                isPurchased: false
            }
        })
        
        
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
        // const selectedTickets = tickets.slice(0, ticketQuantity);
        const selectedTickets = [];
        quantity.forEach((ticket) => {
            const selected = tickets.filter((t) => t.category === ticket.category).slice(0, ticket.quantity);
            selectedTickets.push(...selected);
        })


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
        
        
        res.status(200).send({ session: hold.id, holdUntil: holdUntil })
        
    } catch (error) {
        console.log(error)
    }

}

const purchased = async (req, res, next) => {
/*
    get the user and the hold table
    1) check that the time is still valid 
    2) create an order table with the user id 
    3) get the tickets from the hold table 
    4) update the tickets to be purchased true 
    5) TODO: produce a kafka message that the ticket is purchased
    6) along with adding the order table id to the tickets
*/
    try {
        const user = req.body.user;
        const holdId = req.body.holdId;

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
        const order = await prisma.order.create({
            data:{
                id:uuidv4(),
            }
        })

        //Add this order to the user
        const userOrder = await prisma.customer.update({
            where:{
                id: user
            },
            data:{
                Order:{
                    connect:{
                        id:order.id
                    }
                }
            }
        })
    
        //UPDATE TICKETS
        const ticketsIds = hold.tickets.map(ticket => ticket.id);
        const tickets = await prisma.ticket.updateMany({
            where:{
                id:{
                    in:ticketsIds
                }
            },
            data:{
                isPurchased:true,
            }
        })
        // create reservation
        const reservation = await prisma.reservation.createMany({
            data: hold.tickets.map((ticket) => ({
                id: uuidv4(),
                ticketsId: ticket.id,
                orderId: order.id
            })),
        })


        
        
        return res.status(200).send({order})
        
        
        
    } catch (error) {
        console.log(error)
    }
        
}

const cancel = async (req, res, next) => {
/*
    get hold table id
    1) find the hold table if it exists
    2) get the tickets from the hold table and update them to be isHold false and holdId null
*/

    try {
        const holdId = req.body.id;
        const hold = await prisma.hold.findUnique({
            where:{
                id: holdId,
            },
            include:{
                tickets: true
            }
        })
        if (!hold) return

        const tickets = await prisma.ticket.updateMany({
            where: {
                holdId:hold.id
            },
            data: {
                isHold:false,
                holdId:null
            }
        })
        
    } catch (error) {
        console.log(error)
    }

}


export default { addTicketToCart,purchased,cancel  };