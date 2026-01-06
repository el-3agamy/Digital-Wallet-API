import express from "express";
import { register, login } from "../controllers/auth.controller.js";
import passport from 'passport' ;
import {Strategy}  from 'passport-google-oauth20';
import jwt from "jsonwebtoken";

const router = express.Router();
router.post('/register', register);
router.post('/login', login);

router.get(
  "/google",
  passport.authenticate("google", { 
    scope: ["profile", "email"] ,
     successRedirect : '/protected',
     failureRedirect : '/failur' ,
     prompt: "select_account" 
   }) //Authenticates requests.

);

router.get('/protected', (req, res) => {
        res.send(`hello `)
    });
router.get('/failur', (req, res) => {
        res.send(`Oops! from Failur Autherization Using OAuth. `)
    });

router.get(
  "/google/callback",
  passport.authenticate("google", { session: true }),
  (req, res) => {
    // const token = jwt.sign({ id: req.user._id }, "aaa", { expiresIn: "1d" });
    // res.json({ token  , message : `OAuth work ya so3da!`});
    res.redirect('/auth/protected')
  }
);

export default router;


