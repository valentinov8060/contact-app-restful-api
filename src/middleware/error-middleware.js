import { ResponseError } from "../error/respon-error.js"

const errorMiddleware = (err, req, res, next) => {
    if (!err) {
        return next()
    }

    if (err instanceof ResponseError) {
        res.status(err.statusCode).json({
            message: err.message
        }).end()
    } else {
        res.status(500).json({
            message: err.message
        }).end()
    }
}

export {
    errorMiddleware
}