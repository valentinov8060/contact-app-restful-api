import bcrypt from "bcrypt"
import { v4 as uuidv4 } from 'uuid';

import { prismaClient } from "../app/database.js";
import { validation } from "../validation/validation.js"
import { userRegisterValidationSchema, userLoginValidationSchema, getUserValidationSchema } from "../validation/user-validation.js"
import { ResponseError } from "../error/respon-error.js"

const userRegister = async (request) => {
    const user = validation(userRegisterValidationSchema, request)

    const checkPlagiarismUsername = await prismaClient.user.count({
        where: {
            username: user.username
        }
    })

    if (checkPlagiarismUsername > 0) {
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

const userLogin = async (request) => {
    const user = validation(userLoginValidationSchema, request)

    const getIdAndPasswordByUsername = await prismaClient.user.findFirst({
        where: {
            username: user.username
        }, 
        select: {
            id_user: true,
            password: true
        }
    })
    if (!getIdAndPasswordByUsername) {
        throw new ResponseError(401, "Username or password invalid")
    }

    const checkPassword = await bcrypt.compare(user.password, getIdAndPasswordByUsername.password)
    if (!checkPassword) {
        throw new ResponseError(401, "Username or password invalid")
    }

    const token = uuidv4();

    return prismaClient.user.update({
        where: {
            id_user: getIdAndPasswordByUsername.id_user
        },
        data: {
            token: token
        },
        select: {
            id_user: true,
            token: true
        }
    })
}

const getUser = async (usernameFromHeader) => {
    const username = validation(getUserValidationSchema, usernameFromHeader)

    const getNameAndIdByUsername = await prismaClient.user.findFirst({
        where: {
            username: username
        },
        select: {
            id_user: true,
            username: true,
            name: true
        }
    })

    if (!getNameAndIdByUsername) {
        throw new ResponseError(404, "User not found")
    }

    return getNameAndIdByUsername
}

export {
    userRegister,
    userLogin,
    getUser
}