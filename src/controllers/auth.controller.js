// import bcrypt from 'bcryptjs'
// import userModel from '../models/user.model';

// const register =  async (req , res , next)=>{
   
//     const hashedPassword = await bcrypt.hash(req.body.password , 10) ;
//     const newUser = await userModel.create({...req.body , password : hashedPassword}) ;
//     res.status(201).json({message : "User added Successfly."}) ;

// }

////////////////////////////////////////////////////////////////////////////
// auth.controller.js
import * as authService from "../services/auth.service.js";
import { registerSchema , loginSchema } from "../validations/auth.validation.js";

export const register = async (req, res, next) => {
    const data = registerSchema.parse(req.body);
    await authService.register(data);
    res.status(201).json({ message: "User registered successfully" });
  
};

export const login = async (req, res, next) => {
    const data = loginSchema.parse(req.body);
    const token = await authService.login(data);
    res.status(200).json({ message: "Login success", token });
};

export const signInWithGoogle = async (req ,res , next)=>{
    const data = googleSignInSchema.parse(req.body);
    const token = await authService.signInWithGoogle(data) ;
    res.status(201).json({message : "success login using google." , token})
}