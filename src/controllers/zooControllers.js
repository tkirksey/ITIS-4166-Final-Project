import { createZoo, deleteZoo, getAllZoos, getAnimalsOwnedByZoo, getReviewsAboutZoo, getZooById, updateZoo } from "../services/zooServices.js";

export async function getAllZoosHandler(req, res) {
    const zoos = await getAllZoos();

    res.status(200).json(zoos);
}

export async function getZooByIdHandler(req, res) {
    const id = parseInt(req.params.id);
    const zoo = await getZooById();

    res.status(200).json(zoo);
}

export async function createZooHandler(req, res) {
    let ownerId = parseInt(req.user.id);

    if(req.body.ownerId){
        ownerId = parseInt(req.body.ownerId);
    }

    const { name, location } = req.body;
    const yearOpened = parseInt(req.body.yearOpened);

    const zoo = await createZoo(name, location, yearOpened, ownerId);

    res.status(201).json(zoo);
}

export async function updateZooHandler(req, res) {
    const id = parseInt(req.params.id);
    const { name, location } = req.body;
    
    let yearOpened;
    if(req.body.id){
        yearOpened = parseInt(req.body.yearOpened);
    } else {
        yearOpened = undefined;
    }

    let ownerId;
    if(req.body.ownerId){
        ownerId = parseInt(req.body.ownerId);
    } else {
        ownerId = undefined;
    }

    const zoo = await updateZoo(id, name, location, yearOpened, ownerId);

    res.status(200).json(zoo);
}

export async function deleteZooHandler(req, res) {
    const id = parseInt(req.params.id);

    await deleteZoo(id);

    res.status(204).json({message:'Zoo was successfully deleted.'});
}

export async function getAnimalsOwnedByZooHandler(req, res) {
    const id = parseInt(req.params.id);
    const animals = await getAnimalsOwnedByZoo(id);
    res.status(200).json(animals);
}

export async function getReviewsAboutZooHandler(req, res) {
    const id = parseInt(req.params.id);
    const reviews = getReviewsAboutZoo(id);
    res.status(200).json(reviews);
}
