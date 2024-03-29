import { prismaClient } from '../app/database.js'

const authMiddleware = async (req, res, next) => {
    const token = req.get('Authorization')
    if(!token) {
        res.status(401).json({ 
            error: 'Unauthorized' 
        }).end()
    } else {
        const user = await prismaClient.user.findFirst({
            where: {
                token: token
            }
        })
        if(!user) {
            res.status(401).json({ 
                error: 'Unauthorized' 
            }).end()
        } else {
            req.id_user = user.id_user
            next()
        }
    }
}

export {
    authMiddleware
}