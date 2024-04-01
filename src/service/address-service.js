import { prismaClient } from "../app/database.js";
import { validation } from "../validation/validation.js"
import {
    createAddressValidationSchema,
    updateAddressValidationSchema,
    idUserValidationSchema,
    idContactValidationSchema,
    idAddressValidationSchema
} from "../validation/address-validation.js"
import { ResponseError } from "../error/respon-error.js"

const addressCreate = async (id_user, id_contact, reqBody) => {
    id_user = validation(idUserValidationSchema, id_user)
    id_contact = validation(idContactValidationSchema, id_contact)
    reqBody = validation(createAddressValidationSchema, reqBody)

    const checkUserAndContact = await prismaClient.contact.count({
        where: {
            id_user,
            id_contact
        }
    })

    if (checkUserAndContact !== 1) {
        throw new ResponseError(404, "Contact not found")
        
    }

    reqBody.id_contact = id_contact

    return prismaClient.address.create({
        data: reqBody,
        select: {
            id_address: true,
            street: true,
            city: true,
            province: true,
            country: true,
            postal_code: true
        }
    })
}

const addressGet = async (id_user, id_contact, id_address) => {
    id_user = validation(idUserValidationSchema, id_user)
    id_contact = validation(idContactValidationSchema, id_contact)
    id_address = validation(idAddressValidationSchema, id_address)

    const checkUserAndContact = await prismaClient.contact.count({
        where: {
            id_user,
            id_contact
        }
    })

    if (checkUserAndContact !== 1) {
        throw new ResponseError(404, "Contact not found")
    }

    return prismaClient.address.findFirst({
        where: {
            id_contact,
            id_address
        },
        select: {
            id_address: true,
            street: true,
            city: true,
            province: true,
            country: true,
            postal_code: true
        }
    })
}

const addressUpdate = async (id_user, id_contact, id_address, reqBody) => {
    id_user = validation(idUserValidationSchema, id_user)
    id_contact = validation(idContactValidationSchema, id_contact)
    id_address = validation(idAddressValidationSchema, id_address)
    reqBody = validation(updateAddressValidationSchema, reqBody)

    const checkUserAndContact = await prismaClient.contact.count({
        where: {
            id_user,
            id_contact
        }
    })

    if (checkUserAndContact !== 1) {
        throw new ResponseError(404, "User or contact not found")
    }

    return prismaClient.address.update({
        where: {
            id_address
        },
        data: reqBody,
        select: {
            id_address: true,
            street: true,
            city: true,
            province: true,
            country: true,
            postal_code: true
        }
    })
}

const addressRemove = async (id_user, id_contact, id_address) => {
    id_user = validation(idUserValidationSchema, id_user)
    id_contact = validation(idContactValidationSchema, id_contact)
    id_address = validation(idAddressValidationSchema, id_address)

    const checkUserAndContact = await prismaClient.contact.count({
        where: {
            id_user,
            id_contact
        }
    })

    if (checkUserAndContact !== 1) {
        throw new ResponseError(404, "Contact not found")
    }

    const checkAddress = await prismaClient.address.count({
        where: {
            id_contact,
            id_address
        }
    })

    if (checkAddress !== 1) {
        throw new ResponseError(404, "Address not found")
    }

    return prismaClient.address.delete({
        where: {
            id_contact,
            id_address
        }
    })
}

const addressList = async (id_user, id_contact) => {
    id_user = validation(idUserValidationSchema, id_user)
    id_contact = validation(idContactValidationSchema, id_contact)

    const checkUserAndContact = await prismaClient.contact.count({
        where: {
            id_user,
            id_contact
        }
    })

    if (checkUserAndContact !== 1) {
        throw new ResponseError(404, "Contact not found")
    }

    return prismaClient.address.findMany({
        where: {
            id_contact
        },
        select: {
            id_address: true,
            street: true,
            city: true,
            province: true,
            country: true,
            postal_code: true
        }
    })
}

export {
    addressCreate,
    addressGet,
    addressUpdate,
    addressRemove,
    addressList
}