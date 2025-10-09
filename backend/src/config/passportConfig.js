import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import dotenv from 'dotenv'
import User from '../models/userModels.js'
import { tokenSign } from '../utils/handleJwt.js'

dotenv.config()

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ['profile', 'email'] // Requesting user's profile and email
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const googleId = profile.id
        const email = profile.emails?.[0]?.value
        if (!email) throw new Error('No email found in Google profile')

        // 1. Check if user exists by Google ID
        let user = await User.findOne({ googleId })

        // 2. If not, try to find by email or create a new one
        if (!user) {
          user = await User.findOne({ email })

          if (user) {
            // 2a. Account found by email: link Google ID
            console.log('Account found by email, linking Google ID.')
            user.googleId = googleId
            user.avatar = user.avatar || profile.photos?.[0]?.value
            await user.save()
          } else {
            // 2b. Create new user
            console.log('Creating new user account via Google.')
            user = await User.create({
              googleId,
              displayName: profile.displayName,
              name: `${profile.name.givenName} ${profile.name.familyName}`,
              email,
              avatar: profile.photos?.[0]?.value,
              role: ['user']
            })
          }
        }

        // 3. Generate JWT token
        const token = await tokenSign(user)

        // 4. Pass user and token to next middleware
        return done(null, { user, token })
      } catch (err) {
        console.error('Error in Google Strategy:', err)
        return done(err, null)
      }
    }
  )
)
