import { prismaClient } from "../app/database.js";
import { validation } from "../validation/validation.js"
import { 
    createContactValidationSchema,
    updateContactValidationSchema,
    searchContactValidationSchema,
    idUserValidationSchema,
    idContactValidationSchema
} from "../validation/contact-validation.js"
import { ResponseError } from "../error/respon-error.js"

const contactCreate = async (id_user, reqBody) => {
    validation(idUserValidationSchema, id_user)
    reqBody = validation(createContactValidationSchema, reqBody)

    reqBody.id_user = id_user

    return prismaClient.contact.create({
        data: reqBody,
        select: {
            id_user: true,
            id_contact: true,
            first_name: true,
            last_name: true,
            email: true,
            phone_number: true
        }
    })
}

const contactGet = async (id_user, id_contact) => {
    validation(idUserValidationSchema, id_user)
    validation(idContactValidationSchema, id_contact)

    id_contact = Number(id_contact)
    const result = await prismaClient.contact.findFirst({
        where: {
            id_user,
            id_contact
        },
        select: {
            id_user: true,
            id_contact: true,
            first_name: true,
            last_name: true,
            email: true,
            phone_number: true
        }
    })

    if (!result) {
        throw new ResponseError(404, "File not found")
    }

    return result
}

const contactUpdate = async (id_user, id_contact, reqBody) => {
    validation(idUserValidationSchema, id_user)
    validation(idContactValidationSchema, id_contact)
    const contact = validation(updateContactValidationSchema, reqBody)

    contact.id_contact = Number(id_contact)

    const checkData = await prismaClient.contact.findUnique({
        where: {
            id_user,
            id_contact: contact.id_contact
        },
    });

    if (!checkData) {
        throw new ResponseError(404, "File not found")
    }


    return prismaClient.contact.update({
        where: {
            id_user,
            id_contact: contact.id_contact
        },
        data: contact,
        select: {
            id_user: true,
            id_contact: true,
            first_name: true,
            last_name: true,
            email: true,
            phone_number: true
        }
    })
}

const contactRemove = async (id_user, id_contact) => {
    validation(idUserValidationSchema, id_user)
    validation(idContactValidationSchema, id_contact)

    const checkData = await prismaClient.contact.findUnique({
        where: {
            id_user,
            id_contact: Number(id_contact)
        },
    });

    if (!checkData) {
        throw new ResponseError(404, "File not found")
    }

    return prismaClient.contact.delete({
        where: {
            id_user,
            id_contact: Number(id_contact)
        },
    })
}

const contactSearch = async (id_user, queryParamsValues) => {
    validation(idUserValidationSchema, id_user)
    queryParamsValues = validation(searchContactValidationSchema, queryParamsValues)

    const searchContact = []
    if (queryParamsValues.name) {
        searchContact.push({
            OR: [
                {
                    first_name: {
                        contains: queryParamsValues.name
                    }
                },
                {
                    last_name: {
                        contains: queryParamsValues.name
                    }
                }
            ]
        })
    }
    if (queryParamsValues.email) {
        searchContact.push({
            email: {
                contains: queryParamsValues.email
            }
        })
    }
    if (queryParamsValues.phone_number) {
        searchContact.push({
            phone_number: {
                contains: queryParamsValues.phone_number
            }
        })
    }

    const contacts = await prismaClient.contact.findMany({
        where: {
            id_user,
            AND: searchContact
        },
        take: queryParamsValues.size,
        skip: (queryParamsValues.page - 1) * queryParamsValues.size,
    })

    const total = await prismaClient.contact.count({
        where: {
            id_user,
            AND: searchContact
        }
    })

    return {
        data: contacts,
        paging : {
            page : queryParamsValues.page,
            total_page : Math.ceil(total / queryParamsValues.size),
            total_item : total
        }
    }
}

export {
    contactCreate,
    contactGet,
    contactUpdate,
    contactRemove,
    contactSearch
}