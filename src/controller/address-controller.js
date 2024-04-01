import {
    addressCreate,
    addressGet,
    addressUpdate,
    addressRemove,
    addressList
} from '../service/address-service.js';

const create = async (req, res, next) => {
    try {
        const id_user = req.id_user
        const id_contact = req.params.id_contact
        const address = await addressCreate(id_user, id_contact, req.body)
        res.status(201).json({
            data: address
        })
    } catch (error) {
        next(error)
    }
}

const get = async (req, res, next) => {
    try {
        const id_user = req.id_user
        const id_contact = req.params.id_contact
        const id_address = req.params.id_address
        const address = await addressGet(id_user, id_contact, id_address)
        res.status(200).json({
            data: address
        })
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const id_user = req.id_user
        const id_contact = req.params.id_contact
        const id_address = req.params.id_address
        const address = await addressUpdate(id_user, id_contact, id_address, req.body)
        res.status(200).json({
            data: address
        })
    } catch (error) {
        next(error)
    }
}

const remove = async (req, res, next) => {
    try {
        const id_user = req.id_user
        const id_contact = req.params.id_contact
        const id_address = req.params.id_address
        await addressRemove(id_user, id_contact, id_address)
        res.status(200).json({
            data: "OK"
        })
    } catch (error) {
        next(error)
    }
}

const list = async (req, res, next) => {
    try {
        const id_user = req.id_user
        const id_contact = req.params.id_contact
        const addresses = await addressList(id_user, id_contact)
        res.status(200).json({
            data: addresses
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
    list
}