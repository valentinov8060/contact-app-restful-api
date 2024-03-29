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
        const tokenAndId = await userLogin(req.body)
        res.status(200).json({
            data: tokenAndId
        })
    } catch (error) {
        next(error)
    }
}

const get = async (req, res, next) => {
    try {
        const idFromHeader = req.id_user
        const idUsernameAndName = await userGet(idFromHeader)
        res.status(200).json({
            data: idUsernameAndName
        })

    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const idFromHeader = req.id_user
        const idUsernameAndName = await userUpdate(idFromHeader, req.body)
        res.status(200).json({
            data: idUsernameAndName
        })
    } catch (error) {
        next(error)
    }
}

const logout = async (req, res, next) => {
    try {
        const idFromHeader = req.id_user
        const idUsernameAndName = await userLogout(idFromHeader)
        res.status(200).json({
            data: "OK"
        })
    } catch (error) {
        next(error)
    }
}

export {
    register,
    login,
    get,
    update,
    logout
}