import express from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import cors from 'cors';
import rateLimit from "express-rate-limit";
import authRouter from "./src/routes/auth.routes.js";
import passportConfig from "./src/passport.config.js";
import passport from "passport";
import session from "express-session";

config();

async function bootstrap() {
    const app = express();
    app.use(
        session({
            secret: "keyboard cat",
            resave: false,
            saveUninitialized: false,
            cookie:{
                maxAge : 10 * 1000 ,
                secure : false
            }
        })
    );
    passportConfig();
    app.use(passport.initialize()); //Intializes Passport for incoming requests, allowing authentication strategies to be applied.
   app.use(passport.session());
    const PORT = process.env.PORT || 3000;
    if (!process.env.MONGO_URL) {
        throw new Error("MONGO_URL is not defined");
    }
    const limiter = rateLimit({
        windowMs: 1 * 60 * 1000,
        limit: 25,
        legacyHeaders: false,
        ipv6Subnet: 56,
        standardHeaders: "draft-8",
        message: "Too many requests.",
        statusCode: 429
    });
    app.use(cors());
    app.use(limiter); // limiter is a ready middleware not a function  need to call
    app.use(express.json());
    app.get('/', function (req, res) {
        res.send(`<h1> there is from testing route <h1/> 
                <button> <a href = "/auth/google">sign in with google</a></button>
        `)
    });


    app.use('/auth', authRouter);
    mongoose.connect(process.env.MONGO_URL).then(res => {
        console.log('Done From Connecting DataBase.');
    }).catch(err => {
        console.log(`failed to conect Database: ${err.message}`);
    });

    app.listen(PORT, () => {
        console.log(`server run on port : ${PORT}`);
    });
};

export default bootstrap;



