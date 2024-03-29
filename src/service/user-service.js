import bcrypt from "bcrypt"
import { v4 as uuidv4 } from 'uuid';

import { prismaClient } from "../app/database.js";
import { validation } from "../validation/validation.js"
import { 
    registerUserValidationSchema, 
    loginUserValidationSchema, 
    getUserValidationSchema,
    updateUserValidationSchema
} from "../validation/user-validation.js"
import { ResponseError } from "../error/respon-error.js"

const userRegister = async (reqBody) => {
    const user = validation(registerUserValidationSchema, reqBody)

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

const userLogin = async (reqBody) => {
    const user = validation(loginUserValidationSchema, reqBody)

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

const userGet = async (idFromHeader) => {
    const idUser = validation(getUserValidationSchema, idFromHeader)

    const getUsernameAndNameById = await prismaClient.user.findFirst({
        where: {
            id_user: idUser
        },
        select: {
            id_user: true,
            username: true,
            name: true
        }
    })

    if (!getUsernameAndNameById) {
        throw new ResponseError(404, "User not found")
    }

    return getUsernameAndNameById
}

const userUpdate = async (idFromHeader, reqBody) => {
    const user = validation(updateUserValidationSchema, reqBody)

    const checkUser = await prismaClient.user.findFirst({
        where: {
            id_user: idFromHeader
        }
    })

    if (!checkUser) {
        throw new ResponseError(404, "User not found")
    }

    const data = {}

    if (user.name) {
        data.name = user.name
    }
    if(user.password) {
        data.password = await bcrypt.hash(user.password, 10)
    }

    return prismaClient.user.update({
        where: {
            id_user: idFromHeader
        },
        data: data,
        select: {
            id_user: true,
            username: true,
            name: true
        }
    })
}

const userLogout = async (idFromHeader) => {
    return prismaClient.user.update({
        where: {
            id_user: idFromHeader
        },
        data: {
            token: null
        }
    })
}

export {
    userRegister,
    userLogin,
    userGet,
    userUpdate,
    userLogout
}