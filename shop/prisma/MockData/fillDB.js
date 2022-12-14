import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import user from './customer.js'
import match from './matches.js'
import tickets from './tickets.js'
import fs from 'fs'


async function main(){
    
    
    // const d = await prisma.ticket.createMany({
    //     data:[...tickets],
    // })


    // i want to get the number of tickets for the first match where the category is 1
    const m = await prisma.ticket.findMany({
        where:{
            matchId:2,
            isHold:true,
        },
    })


    console.log(m)


}

main().catch((e)=>{
    console.log(e.message);
}).finally(async ()=>{
    await prisma.$disconnect()
})