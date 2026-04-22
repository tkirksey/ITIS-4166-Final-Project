import bcrypt from 'bcrypt';
import { create, findByEmail } from '../repositories/userRepo.js';
import jwt from 'jsonwebtoken';

export async function signup(email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await create({email, password: hashedPassword});
    return newUser;
}

export async function login(email, password) {

    const JWT_SECRET = process.env.JWT_SECRET;
    const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

    const err = new Error('Invalid credentials');
    err.status = 401;

    const user = await findByEmail(email);

    if(!user){
        throw err;
    }

    const match = await bcrypt.compare(password, user.password);
    
    if(!match){
        throw err;
    }

    const accessToken = jwt.sign(
        {id: user.id, role: user.role},
        JWT_SECRET,
        {expiresIn: JWT_EXPIRES_IN}
    );

    return accessToken;

}