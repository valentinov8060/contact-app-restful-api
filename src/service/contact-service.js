import { prismaClient } from "../app/database.js";
import { validation } from "../validation/validation.js"
import { 
    createContactValidationSchema,
    updateContactValidationSchema,
    searchContactValidationSchema
} from "../validation/contact-validation.js"
import { ResponseError } from "../error/respon-error.js"

const contactCreate = async (id_user, reqBody) => {
    const contact = validation(createContactValidationSchema, reqBody)

    contact.id_user = id_user

    return prismaClient.contact.create({
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

const contactGet = async (id_user, id_contact) => {

    const id_contactInt = Number(id_contact)
    const result = await prismaClient.contact.findFirst({
        where: {
            id_user,
            id_contact: id_contactInt
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

    reqBody.id_contact = Number(id_contact)
    const contact = validation(updateContactValidationSchema, reqBody)

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

const contactSearch = async (id_user, queryParams) => {

    queryParams = validation(searchContactValidationSchema, queryParams)

    const searchContact = []
    if (queryParams.name) {
        searchContact.push({
            OR: [
                {
                    first_name: {
                        contains: queryParams.name
                    }
                },
                {
                    last_name: {
                        contains: queryParams.name
                    }
                }
            ]
        })
    }
    if (queryParams.email) {
        searchContact.push({
            email: {
                contains: queryParams.email
            }
        })
    }
    if (queryParams.phone_number) {
        searchContact.push({
            phone_number: {
                contains: queryParams.phone_number
            }
        })
    }

    const contacts = await prismaClient.contact.findMany({
        where: {
            id_user,
            AND: searchContact
        },
        take: queryParams.size,
        skip: (queryParams.page - 1) * queryParams.size,
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
            page : queryParams.page,
            total_page : Math.ceil(total / queryParams.size),
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