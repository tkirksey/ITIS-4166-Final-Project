import { getAnimalById } from "../services/animalServices.js";
import { getUserById } from "../services/userServices.js";
import { getZooById } from "../services/zooServices.js";

const NotPermittedError = new Error("Forbidden: insufficient permission.");
NotPermittedError.status = 403;

export async function authorizeUserOwnership(req, res, next) {

    const id = parseInt(req.params.id);
    const user = await getUserById(id);

    if(req.user.role !== 'ADMIN'){
        return next(NotPermittedError);
    }

    next();

}

export async function authorizeZooOwnership(req, res, next) {
    
    const id = parseInt(req.params.id);
    const zoo = await getZooById(id);

    if(zoo.ownerId !== req.user.id && req.user.role !== 'ADMIN'){
        return next(NotPermittedError);
    }

    next();
}

export async function authorizeAnimalOwnership(req, res, next) {
    
    const id = parseInt(req.params.id);
    const animal = await getAnimalById(id);

    const zoo = await getZooById(animal.zooId);

    if(zoo.ownerId !== req.user.id && req.user.role !== 'ADMIN'){
        return next(NotPermittedError);
    }

    next();

}