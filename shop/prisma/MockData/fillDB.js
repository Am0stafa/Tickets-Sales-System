import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import user from './customer.js'
import match from './matches.js'
import tickets from './tickets.js'


async function main(){
    
    
    const d = await prisma.ticket.createMany({
        data:[...tickets],
    })



}

main().catch((e)=>{
    console.log(e.message);
}).finally(async ()=>{
    await prisma.$disconnect()
})