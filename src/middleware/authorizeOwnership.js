import { getUserById } from "../services/userServices.js";
import { getZooById } from "../services/zooServices.js";

export async function authorizeUserOwnership(req, res, next) {

    const id = parseInt(req.params.id);
    const user = await getUserById(id);

    if(req.user.role !== 'ADMIN'){
        const error = new Error("Forbidden: insufficient permission.");
        error.status = 403;
        return next(error);
    }

    next();

}

export async function authorizeZooOwnership(req, res, next) {
    
    const id = parseInt(req.params.id);
    const zoo = await getZooById(id);

    if(zoo.ownerId !== req.user.id || req.user.role !== 'ADMIN'){
        const error = new Error("Forbidden: insufficient permission.");
        error.status = 403;
        return next(error);
    }

    next();
}