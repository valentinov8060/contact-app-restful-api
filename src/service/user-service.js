import bcrypt from "bcrypt"
import { v4 as uuidv4 } from 'uuid';

import { prismaClient } from "../app/database.js";
import { validation } from "../validation/validation.js"
import { 
    registerUserValidationSchema, 
    loginUserValidationSchema, 
    updateUserValidationSchema,
    idUserValidationSchema
} from "../validation/user-validation.js"
import { ResponseError } from "../error/respon-error.js"

const userRegister = async (reqBody) => {
    reqBody = validation(registerUserValidationSchema, reqBody)

    const checkPlagiarismUsername = await prismaClient.user.count({
        where: {
            username: reqBody.username
        }
    })

    if (checkPlagiarismUsername > 0) {
        throw new ResponseError(400, "Username already exist")
    }

    reqBody.password = await bcrypt.hash(reqBody.password, 10)

    return prismaClient.user.create({
        data: reqBody,
        select: {
            username: true,
            name: true
        }
    })
}

const userLogin = async (reqBody) => {
    reqBody = validation(loginUserValidationSchema, reqBody)

    const getIdAndPasswordByUsername = await prismaClient.user.findFirst({
        where: {
            username: reqBody.username
        }, 
        select: {
            id_user: true,
            password: true
        }
    })
    if (!getIdAndPasswordByUsername) {
        throw new ResponseError(401, "Username or password invalid")
    }

    const checkPassword = await bcrypt.compare(reqBody.password, getIdAndPasswordByUsername.password)
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
    idFromHeader = validation(idUserValidationSchema, idFromHeader)

    const getUsernameAndNameById = await prismaClient.user.findFirst({
        where: {
            id_user: idFromHeader
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
    idFromHeader = validation(idUserValidationSchema, idFromHeader)
    reqBody = validation(updateUserValidationSchema, reqBody)

    const checkUser = await prismaClient.user.findFirst({
        where: {
            id_user: idFromHeader
        }
    })

    if (!checkUser) {
        throw new ResponseError(404, "User not found")
    }

    const data = {}

    if (reqBody.name) {
        data.name = reqBody.name
    }
    if(reqBody.password) {
        data.password = await bcrypt.hash(reqBody.password, 10)
    }

    return prismaClient.user.update({
        where: {
            id_user: idFromHeader
        },
        data,
        select: {
            id_user: true,
            username: true,
            name: true
        }
    })
}

const userLogout = async (idFromHeader) => {
    validation(idUserValidationSchema, idFromHeader)

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