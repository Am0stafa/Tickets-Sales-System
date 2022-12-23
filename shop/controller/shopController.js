import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const matches = prisma.Match;

const getAll = async (req, res) => {
  try {
    const page = req.query.page;
    const limit = req.query.limit;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const allMatches = await matches.findMany();
    const filteredData = allMatches.slice(startIndex, endIndex);
    if (isNaN(startIndex) || isNaN(endIndex) || page<0 || limit <0 ) {
      res.status(200).json({
        status: "success",
        data: {
          allMatches
        }
      });
    }
    else res.status(200).json({
      status: "success",
      data: {
        filteredData
      }
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message
    });
  }
};

const availability = async (id,all=false) => {
    try {
        
        const tickets = await prisma.ticket.findMany({
            where: {
                matchId: id
            }
        });
        const hold = await prisma.ticket.findMany({
            where: {
                matchId: id,
                isHold: true
            }
        });
        const sold = await prisma.ticket.findMany({
            where: {
                matchId: id,
                isPurchased: true
            }
        });
        const available = tickets.length - hold.length - sold.length;
        let status = "";
        if(available < 0) {
            status = "Sold Out";
        } else if (available > 0 && available < 10) {
            status = "Almost Sold Out";
        } 
        else if (tickets.length === 0 && hold.length > 0) {
            status = "Temporarily Unavailable"
        }
        else {
            status = "Available";
        }
        if(all){
            return {
                matchId: id,
                status: status,
                numOfAvailable: available
            }
        }
        return {
            matchId: id,
            status: status,
            numOfTickets: tickets.length,
            numOfHold: hold.length,
            numOfSold: sold.length,
            numOfAvailable: available
        }
    } catch (error) {
        return {
            message: error.message
        }
    }


            
}

const getAvailability = async (req, res) => {
    const data = await availability(parseInt(req.params.matchId));
    if(data.message) {
        res.status(400).json({
            message: data.message
        });
    }
    res.status(200).json({
        status: "success",
        data: data
    });
        
    

};

const availableCat = async (req, res) => {
    try {
        const cat1 = await prisma.ticket.findMany({
            where: {
                matchId: parseInt(req.params.matchId),
                category:"Category 1",
                isPurchased: false,
                isHold: false
            }
        });

        const cat2 = await prisma.ticket.findMany({
            where: {
                matchId: parseInt(req.params.matchId),
                category:"Category 2",                
                isPurchased: false,
                isHold: false
            }
        });

        const cat3 = await prisma.ticket.findMany({
            where: {
                matchId: parseInt(req.params.matchId),
                category:"Category 3",
                isPurchased: false,
                isHold: false
            }
        });
        const cat4 = await prisma.ticket.findMany({
            where: {
                matchId: parseInt(req.params.matchId),
                category:"Category 4",
                isPurchased: false,
                isHold: false
            }
        });


        res.status(200).json({
            matchId: parseInt(req.params.matchId),
            category1: cat1.length,
            category2: cat2.length,
            category3: cat3.length,
            category4: cat4.length
        });
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

const getAllAvailability = async (req, res) => {
    const allMatches = await matches.findMany();
    // this is how that data will be returned
    // {
    //     "matchId": id,
    //     "status": "Available",
    //     "numOfAvailable": 720
    // }
    const ids = allMatches.map(match => match.id);
    const promises = ids.map(id => availability(id,true));
    const data = await Promise.all(promises);
    res.status(200).json({
        status: "success",
        data: data
    });



}

const getHold = async (req, res) => {
    try {
        const hold = await prisma.hold.findMany({
            where: {
                id:"5a3a3dab-eb66-4fde-8f92-c6eb906aa88a"
            },
            include: {
                Ticket: true
            }
        });
        res.status(200).json({
            status: "success",
            data: hold
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}


export default { getAll,  getAvailability,availableCat,availableCat,getAllAvailability,getHold };
