import { 
    getAllAnimals, 
    getAnimalById, 
    createAnimal, 
    updateAnimal, 
    deleteAnimal 
} from '../services/animalServices.js';

export async function getAllAnimalsHandler(req, res) {
    const animals = await getAllAnimals();
    res.status(200).json(animals);
}

export async function getAnimalByIdHandler(req, res) {
    const id = parseInt(req.param.id);
    const animal = await getAnimalById(id);
    res.status(200).json(animal);
}

export async function createAnimalHandler(req, res) {
    const zooId = parseInt(req.body.zooId);
    const { nickname, species } = req.body;
    const animal = await createAnimal(nickname, species, zooId);
    res.status(201).json(animal);
}

export async function updateAnimalHandler(req, res) {
    const id = parseInt(req.param.id);
    const { nickname, species } = req.body;
    
    let zooId = undefined;
    if(req.body.zooId){
        zooId = parseInt(req.body.zooId);
    }

    const animal = await updateAnimal(id, nickname, species, zooId);

    res.status(200).json(animal);
}

export async function deleteAnimalHandler(req, res) {
    const id = parseInt(req.param.id);

    await deleteAnimal(id);

    res.status(204).json({message:'Animal was successfully deleted'});
}