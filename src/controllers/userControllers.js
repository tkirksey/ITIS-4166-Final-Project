import { createUser, deleteUserById, getAllUsers, getReviewsAuthoredByUser, getUserById, getZoosOwnedByUser, updateUser } from "../services/userServices.js";

export async function deleteUserByIdHandler(req, res) {
    const id = parseInt(req.params.id);
    await deleteUserById(id);
    res.status(204).json({ message: 'User deleted successfully' });
}

export async function getUserByIdHandler(req, res) {
    const id = parseInt(req.params.id);
    const user = await getUserById(id);
    res.status(200).json(user);
}

export async function getAllUsersHandler(req, res) {
    const users = await getAllUsers();
    res.status(200).json(users);
}

export async function createUserHandler(req, res) {
    const { email, password, role } = req.body;
    const user = await createUser(email, password, role);
    res.status(201).json(user);
}

export async function updateUserHandler(req, res) {
    const id = parseInt(req.params.id);
    const { email, password, role } = req.body;
    const user = await updateUser(id, email, password, role);
    res.status(200).json(user);
}

export async function getZoosOwnedByUserHandler(req, res) {
    const id = parseInt(req.params.id);
    const zoos = await getZoosOwnedByUser(id);
    res.status(200).json(zoos);
}

export async function getReviewsAuthoredByUserHandler(req, res) {
    const id = parseInt(req.params.id);
    const reviews = await getReviewsAuthoredByUser(id);
    res.status(200).json(reviews);
}