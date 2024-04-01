import Joi from "joi";

const createAddressValidationSchema = Joi.object({
    street: Joi.string().max(255).optional(),
    city: Joi.string().max(100).optional(),
    province: Joi.string().max(100).optional(),
    country: Joi.string().max(100).required(),
    postal_code: Joi.string().max(10).required()
})

const updateAddressValidationSchema = Joi.object({
    street: Joi.string().max(255).optional(),
    city: Joi.string().max(100).optional(),
    province: Joi.string().max(100).optional(),
    country: Joi.string().max(100).required(),
    postal_code: Joi.string().max(10).required()
})


const idUserValidationSchema = Joi.string().max(100).required()

const idContactValidationSchema = Joi.number().positive().required()

const idAddressValidationSchema = Joi.number().positive().required()

export {
    createAddressValidationSchema,
    updateAddressValidationSchema,
    idUserValidationSchema,
    idContactValidationSchema,
    idAddressValidationSchema
}