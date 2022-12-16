import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const users = prisma.Customer;

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await users.findMany();
    res.status(200).json({ data: allUsers });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const createUser = async (req, res) => {
  try {
    
    const user = await users.create({
      data: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        country: req.body.country,
        email: req.body.email,
        password: req.body.password,
        Order: req.body.Order
      }
    });
    console.log(
      req.body.firstName,
      req.body.lastName,
      req.body.phone,
      req.body.country,
      req.body.email,
      req.body.password,
      req.body.Order
    );
    res.status(201).send(`User {${req.body.email}} successfully created`);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getUserById = async (req, res) => {
  try {
    const foundUser = await users.findUnique({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json({
      status: "success",
      data: foundUser
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

//

export default { createUser, getUserById, getAllUsers };
