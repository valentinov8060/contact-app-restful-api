import bcrypt from "bcrypt"

import { prismaClient } from "../app/database.js";
import { validation } from "../validation/validation.js"
import { userRegisterValidationSchema } from "../validation/user-validation.js"
import { ResponseError } from "../error/respon-error.js"

const userRegister = async (request) => {
    const user = validation(userRegisterValidationSchema, request)

    const checkPlagiarism = await prismaClient.user.count({
        where: {
            username: user.username
        }
    })

    if (checkPlagiarism > 0) {
        throw new ResponseError(400, "Username already exist")
    }

    user.password = await bcrypt.hash(user.password, 10)

    return prismaClient.user.create({
        data: user,
        select: {
            username: true,
            name: true
        }
    })
}

export {
    userRegister
}