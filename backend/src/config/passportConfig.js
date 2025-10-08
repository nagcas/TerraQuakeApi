import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import dotenv from 'dotenv'
import User from '../models/userModels.js'
import { tokenSign } from "../utils/handleJwt.js";

dotenv.config()

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ['profile', 'email'], // Requesting user's profile and email
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const googleId = profile.id;
        const email = profile.emails?.[0]?.value;
        // 1. Check if user exists
        let user = await User.findOne({ googleId: googleId });
        // console.log(user)
        // 2. If not, create a new one
        if (!user) {
          user = await User.findOne({ email: email });
          if (user) {
            // 2a. Account found by email: LINK the Google ID to the existing account
            console.log("Account found by email, linking Google ID.");
            user.googleId = googleId;
            // Update avatar if the user doesn't have one yet
            user.avatar = user.avatar || profile.photos?.[0]?.value;
            await user.save();
          } else {
            // 2b. No account found: Create a NEW account
            console.log("Creating new user account via Google.");
            user = await User.create({
              googleId: googleId,
              displayName: profile.displayName,
              email: email,
              avatar: profile.photos?.[0]?.value, // Use 'avatar' to match the model
              role: "user",
            });
          }
        }

        // 3. Generate JWT using existing utility
        const token = await tokenSign(user);

        // 4. Pass user and token forward
        return done(null, { user, token });
      } catch (err) {
        console.error("Error in Google Strategy:", err);
        return done(err, null);
      }
    }

  )
)

