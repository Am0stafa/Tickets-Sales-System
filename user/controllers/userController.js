import { PrismaClient } from "@prisma/client";
import crypto from "crypto";
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
    const {name , email, token} = req.body;


    // first if a user with this email exists then we return status 200
    const user = await users.findMany({
        where: {
            email: email
        }
    });
    if(user.length !== 0) {
        return res.status(200).json({
            message: "User already exists"
        });
    }
    const id = crypto.randomBytes(16).toString("hex") + Date.now();

    // if user does not exist then we create a new user
    const newUser = await users.create({
        data: {
            id: id,
            firstName: name.split(" ")[0],
            lastName: name.split(" ")[1],
            email: email,
            password: token
        }
    });
    
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

const getTicketById = async (req, res) => {
    try {
        const user = await prisma.Customer.findUnique({
            where: {
                id: req.params.id
            },
            include: {
                Order: {
                    include: {
                        Reservation: {
                            include: {
                                Ticket: true
                            }
                        }
                    }
                }
            }
        });
        if(!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }
        if(user.Order.length === 0) {
            return res.status(400).json({
                message: "User has no orders"
            });
        }
        // return only which have reservation array not empty
        const data = user.Order.filter(order => order.Reservation.length > 0);

        res.status(200).json({
            status: "success",
            data: data
            
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }

}    

const getIdByEmail = async (req, res) => {
    try {
        const user = await users.findMany({
            where: {
                email: req.params.email
            }
        });
        if(!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }
        res.status(200).json({
            status: "success",
            data: user[0].id
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}


export default { createUser, getUserById, getAllUsers, getTicketById,getIdByEmail };
