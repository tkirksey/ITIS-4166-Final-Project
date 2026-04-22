import { getUserById } from "../services/userServices.js";

export async function authorizeUserOwnership(req, res, next) {

    const id = parseInt(req.params.id);
    const user = await getUserById(id);

    if(user.id !== req.user.id || req.user.role !== 'ADMIN'){
        const error = new Error("Forbidden: insufficient permission.");
        error.status = 403;
        return next(error);
    }

    next();

}