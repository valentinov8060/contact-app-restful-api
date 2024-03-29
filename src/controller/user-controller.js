import {userRegister, userLogin, getUser} from "../service/user-service.js"
// import { authMiddleware } from "../middleware/auth-middleware.js"

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
        const usernameFromHeader = req.username
        const idUsernameAndName = await getUser(usernameFromHeader)
        res.status(200).json({
            data: idUsernameAndName
        })

    } catch (error) {
        next(error)
    }
}

export {
    register,
    login,
    get
}