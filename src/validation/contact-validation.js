import Joi from "joi";

const createContactValidationSchema = Joi.object({
    first_name: Joi.string().max(100).required(),
    last_name: Joi.string().max(100).optional(),
    email: Joi.string().max(200).optional(),
    phone_number: Joi.string().max(15).optional()
})

const updateContactValidationSchema = Joi.object({
    id_contact: Joi.number().positive().required(),
    first_name: Joi.string().max(100).required(),
    last_name: Joi.string().max(100).optional(),
    email: Joi.string().max(200).optional(),
    phone_number: Joi.string().max(15).optional()
})

const searchContactValidationSchema = Joi.object({

    page: Joi.number().min(1).positive().default(1),
    size: Joi.number().min(1).max(100).positive().default(10),
    name: Joi.string().optional(),
    email: Joi.string().optional(),
    phone_number: Joi.string().optional()
})

export {
    createContactValidationSchema,
    updateContactValidationSchema,
    searchContactValidationSchema
}