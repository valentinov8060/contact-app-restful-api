import Joi from "joi";

const registerUserValidationSchema = Joi.object({
    username: Joi.string().max(100).required(),
    password: Joi.string().max(100).required(),
    name: Joi.string().max(100).required()
})

const loginUserValidationSchema = Joi.object({
    username: Joi.string().max(100).required(),
    password: Joi.string().max(100).required()
})

const updateUserValidationSchema = Joi.object({
    name: Joi.string().max(100).optional(),
    password: Joi.string().max(100).optional()
})

const idUserValidationSchema = Joi.string().max(100).required()

export {
    registerUserValidationSchema,
    loginUserValidationSchema,
    updateUserValidationSchema,
    idUserValidationSchema
}
