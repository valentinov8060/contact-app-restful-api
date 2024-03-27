import {userRegister} from "../service/user-service.js"

const register = async (req, res, next) => {
    try {
        const result = await userRegister(req.body)
        res.status(200).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

export {
    register
}