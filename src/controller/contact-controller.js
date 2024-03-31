import {
    contactCreate,
    contactGet,
    contactUpdate,
    contactRemove,
    contactSearch
} from "../service/contact-service.js";

const create = async (req, res, next) => {
    try {
        const idUser = req.id_user
        const contact = await contactCreate(idUser, req.body)
        res.status(201).json({
            data: contact 
        })

    } catch (error) {
        next(error)
    }
}

const get = async (req, res, next) => {
    try {
        const idUser = req.id_user
        const idContact = req.params.id_contact
        const contact = await contactGet(idUser, idContact)
        res.status(200).json({
            data: contact
        })
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const idUser = req.id_user
        const idContact = req.params.id_contact
        const contact = await contactUpdate(idUser, idContact, req.body)
        res.status(200).json({
            data: contact
        })
    } catch (error) {
        next(error)
    }
}

const remove = async (req, res, next) => {
    try {
        const idUser = req.id_user
        const idContact = req.params.id_contact
        await contactRemove(idUser, idContact)
        res.status(200).json({
            data: "OK"
        })
    } catch (error) {
        next(error)
    }
}

const search = async (req, res, next) => {
    try {
        const idUser = req.id_user
        const queryParamsValues = {
            name: req.query.name,
            email: req.query.email,
            phone_number: req.query.phone_number,
            page: req.query.page,
            size: req.query.size
        }
        const contact = await contactSearch(idUser, queryParamsValues)
        res.status(200).json({
            data: contact
        })
    } catch (error) {
        next(error)
    }
}

export default {
    create,
    get,
    update,
    remove,
    search
}