import {
    userRegister, 
    userLogin, 
    userGet,
    userUpdate,
    userLogout
} from "../service/user-service.js"

const register = async (req, res, next) => {
    try {
        const usernameAndName = await userRegister(req.body)
        res.status(200).json({
            data: usernameAndName
        })
    } catch (error) {
        next(error)
    }
}

const login = async (req, res, next) => {
    try {
        const tokenAndIdUser = await userLogin(req.body)
        res.status(200).json({
            data: tokenAndIdUser
        })
    } catch (error) {
        next(error)
    }
}

const get = async (req, res, next) => {
    try {
        const idUserUsernameAndName = await userGet(req.id_user)
        res.status(200).json({
            data: idUserUsernameAndName
        })

    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const idUserUsernameAndName = await userUpdate(req.id_user, req.body)
        res.status(200).json({
            data: idUserUsernameAndName
        })
    } catch (error) {
        next(error)
    }
}

const logout = async (req, res, next) => {
    try {
        await userLogout(req.id_user)
        res.status(200).json({
            data: "OK"
        })
    } catch (error) {
        next(error)
    }
}

export default {
    register,
    login,
    get,
    update,
    logout
}