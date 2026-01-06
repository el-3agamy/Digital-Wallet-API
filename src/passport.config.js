import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import userModel from "./models/user.model.js";

export default function passportConfig() {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
        
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails[0].value;
          // console.log(profile);
          
          let user = await userModel.findOne({ email });
          if (!user) {
            user = await userModel.create({
              firstName: profile.name.givenName,
              lastName: profile.name.familyName,
              email,
              googleId: profile.id,
            });
          }

          done(null, user);
        } catch (err) {
          done(err, false);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {  //Registers a function used to serialize user objects into the session.
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await userModel.findById(id);
    done(null, user);
  });
}
