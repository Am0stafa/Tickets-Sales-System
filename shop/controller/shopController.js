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

const getMatchById = async (req, res) => {
  try {
    const match = await matches.findUnique({
      where: {
        id: parseInt(req.params.id)
      }
    });
    res.status(200).json({
      status: "success",
      data: match
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

const getAvailability = async (req, res) => {
    try {
        
        const tickets = await prisma.ticket.findMany({
            where: {
                matchId: parseInt(req.params.matchId),
            }
        });

        const hold = await prisma.ticket.findMany({
            where: {
                matchId: parseInt(req.params.matchId),
                isHold: true
            }
        });
        const sold = await prisma.ticket.findMany({
            where: {
                matchId: parseInt(req.params.matchId),
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

        res.status(200).json({
            matchId: parseInt(req.params.matchId),
            status: status,
            numOfTickets: tickets.length,
            numOfHold: hold.length,
            numOfSold: sold.length,
            numOfAvailable: available
        });

    } catch (error) {
        res.status(400).json({
        message: error.message
        });
    }
};

const availableCat = async (req, res) => {
    try {
        const cat1 = await prisma.ticket.findMany({
            where: {
                matchId: parseInt(req.params.matchId),
                category:"Category 1"
            }
        });

        const cat2 = await prisma.ticket.findMany({
            where: {
                matchId: parseInt(req.params.matchId),
                category:"Category 2"
            }
        });

        const cat3 = await prisma.ticket.findMany({
            where: {
                matchId: parseInt(req.params.matchId),
                category:"Category 3"
            }
        });
        const cat4 = await prisma.ticket.findMany({
            where: {
                matchId: parseInt(req.params.matchId),
                category:"Category 4"
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

        

export default { getAll, getMatchById, getAvailability,availableCat,availableCat };
