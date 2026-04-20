import { login, signup } from "../services/authServices.js";

export async function signUpHandler(req, res) {
    const { email, password } = req.body;
    const newUser = await signup(email, password);
    res.status(201).json(newUser);
}

export async function loginHandler(req, res) {
    const { email, password } = req.body;
    const accessToken = await login(email, password);
    res.status(200).json({accessToken});
}