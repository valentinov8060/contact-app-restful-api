import { ResponseError } from "../error/respon-error.js"

const errorMiddleware = (err, req, res, next) => {
    if (!err) {
        return next()
    }

    if (err instanceof ResponseError) {
        res.status(err.statusCode).json({
            error: err.message
        }).end()
    } else {
        res.status(500).json({
            error: err.message
        }).end()
    }
}

export {
    errorMiddleware
}