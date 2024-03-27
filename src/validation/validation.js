import { ResponseError } from "../error/respon-error.js"

const validation = (userRegisterValidationSchema, request) => {
    const result = userRegisterValidationSchema.validate(request, {
        abortEarly: false
    })

    if (result.error) {
        throw new ResponseError(400, result.error.message)
    } else {
        return result.value
    }
}

export {
    validation
}