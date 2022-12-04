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

export default { getAll, getMatchById };
