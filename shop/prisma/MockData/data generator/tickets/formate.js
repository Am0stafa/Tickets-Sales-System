const data = require('./output.json')
const fs = require('fs');

newData = data.map((ticket) =>{
    if (ticket.category === "Category 1"){
        ticket.price = 200
    }
    else if (ticket.category === "Category 2"){
        ticket.price = 400
    }
    else if (ticket.category === "Category 3"){
        ticket.price = 800
    }
    else{
        ticket.price = 1200
    }
    return ticket
})



fs.writeFileSync('./output.json', JSON.stringify(newData, null, 2) , 'utf-8');
