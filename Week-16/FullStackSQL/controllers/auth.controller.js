import { prismaClient } from "@prisma/client"

export const registerUser = async (req, res)=>{
    console.log('register User');
    await prisma.user.findUnique({
        where: {email}
    })
};

