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
        if(available === 0) {
            status = "Sold Out";
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

const getSoldCat = async (req, res) => {
    // this endpoint will get the matchId and return the number of tickets sold in each category
    try {
        const matchId = parseInt(req.params.matchId);
        const cat1 = await prisma.ticket.findMany({
            where: {
                matchId: matchId,
                category:"Category 1",
                isPurchased: true,
            }
        });

        const cat2 = await prisma.ticket.findMany({
            where: {
                matchId: matchId,
                category:"Category 2",
                isPurchased: true,
            }
        });

        const cat3 = await prisma.ticket.findMany({
            where: {
                matchId: matchId,
                category:"Category 3",
                isPurchased: true,
            }
        });

        const cat4 = await prisma.ticket.findMany({
            where: {
                matchId: matchId,
                category:"Category 4",
                isPurchased: true,
            }
        });

        res.status(200).json({
            matchId: matchId,
            category1: cat1.length,
            category2: cat2.length,
            category3: cat3.length,
            category4: cat4.length
        });


    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }



}

const getMostSold = async (req, res) => {
    // this endpoint will return an array of matchIds from most sold to least sold according to isPurchased value in tickets and isPurchased is a boolean of true purchased and false not purchased
    try {
        const allMatches = await matches.findMany({});
        const ids = allMatches.map(match => match.id);
        const promises = ids.map(id => availability(id,true));
        const data = await Promise.all(promises);
        const sorted = data.sort((a,b) => b.numOfAvailable - a.numOfAvailable);
        const result = sorted.map(match => match.matchId);
        res.status(200).json({
            status: "success",
            data: result
        });
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        });
    }

}

const getDashboard = async (req, res) => {

    try {
        const cat1 = await prisma.ticket.findMany({
            where: {
                category:"Category 1",
                isPurchased: true,
                external: false
            }
        });

        const cat2 = await prisma.ticket.findMany({
            where: {
                category:"Category 2",
                isPurchased: true,
                external: false

            }
        });

        const cat3 = await prisma.ticket.findMany({
            where: {
                category:"Category 3",
                isPurchased: true,
                external: false
            }
        });

        const cat4 = await prisma.ticket.findMany({
            where: {
                category:"Category 4",
                isPurchased: true,
                external: false
            }
        });


        const ourTotalSales = cat1.length + cat2.length + cat3.length + cat4.length;
        const totalEarnings = (cat1.length * 75) + (cat2.length * 125) + (cat3.length * 195) + (cat4.length * 400);

        const externally = await prisma.ticket.findMany({
            where: {
                external: true,
                isPurchased: true
            }
        });
        
        const customers = await prisma.customer.findMany({});
        const totalCustomers = customers.length;

        res.status(200).json({
            ourTotalSales: ourTotalSales,
            outsideSales: externally.length,
            totalEarnings: totalEarnings,
            totalCustomers: totalCustomers
        });







    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }

}

const getCatStats = async (req, res) => {
    const matchId = parseInt(req.params.matchId);
    // this endpoint will return an object of {"category name": [number of sold, number of available]}  for each category
    try {
        const cat1 = await prisma.ticket.findMany({
            where: {
                matchId: matchId,
                category:"Category 1",
                isPurchased: true,
            }
        });

        const cat2 = await prisma.ticket.findMany({
            where: {
                matchId: matchId,
                category:"Category 2",
                isPurchased: true,
            }
        });

        const cat3 = await prisma.ticket.findMany({
            where: {
                matchId: matchId,
                category:"Category 3",
                isPurchased: true,
            }
        });

        const cat4 = await prisma.ticket.findMany({
            where: {
                matchId: matchId,
                category:"Category 4",
                isPurchased: true,
            }
        });

        const cat1Avail = await prisma.ticket.findMany({
            where: {
                matchId: matchId,
                category:"Category 1",
                isPurchased: false,
            }
        });

        const cat2Avail = await prisma.ticket.findMany({
            where: {
                matchId: matchId,
                category:"Category 2",
                isPurchased: false,
            }
        });

        const cat3Avail = await prisma.ticket.findMany({
            where: {
                matchId: matchId,
                category:"Category 3",
                isPurchased: false,
            }
        });

        const cat4Avail = await prisma.ticket.findMany({
            where: {
                matchId: matchId,
                category:"Category 4",
                isPurchased: false,
            }
        });

        const cat1Hold = await prisma.ticket.findMany({
            where: {
                matchId: matchId,
                category:"Category 1",
                isHold: true,
            }
        });

        const cat2Hold = await prisma.ticket.findMany({
            where: {
                matchId: matchId,
                category:"Category 2",
                isHold: true,
            }
        });

        const cat3Hold = await prisma.ticket.findMany({
            where: {
                matchId: matchId,
                category:"Category 3",
                isHold: true,
            }
        });

        const cat4Hold = await prisma.ticket.findMany({
            where: {
                matchId: matchId,
                category:"Category 4",
                isHold: true,
            }
        });

        res.status(200).json({
            series: [
                {
                    name: "Category 1",
                    data: [cat1.length, cat1Avail.length, cat1Hold.length]
                },
                {
                    name: "Category 2",
                    data: [cat2.length, cat2Avail.length, cat2Hold.length]
                },
                {
                    name: "Category 3",
                    data: [cat3.length, cat3Avail.length, cat3Hold.length]
                },
                {
                    name: "Category 4",
                    data: [cat4.length, cat4Avail.length, cat4Hold.length]
                }
            ]
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }


}

const getHoldMatch = async (req, res) => {
    // this request takes an id of the hold table and if it exits it return 200 if not it returns 400
    const id = (req.params.id);
    try {
        // find such that its exactly equal the id
        const hold = await prisma.hold.findFirst({
            where: {
                id: id
            }
        });
        
        if (hold) {
            res.status(200).json({
                message: "Hold exists"
            });
        }
        else {
            res.status(400).json({
                message: "Hold does not exist"
            });
        }

    }
    catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
    

}

export default { getAll,  getAvailability,availableCat,availableCat,getAllAvailability,getHold,getSoldCat,getMostSold,getDashboard,getCatStats,getHoldMatch,availability, prisma };
