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
      scope: ['profile', 'email']
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // 1. Check if user exists by Google ID
        let user = await User.findOne({ googleId: profile.id })

        // 2. If not, try to find by email or create a new one
        if (!user) {
          user = new User({
            googleId: profile.id,
            name: `${profile.name?.givenName || ''} ${profile.name?.familyName || ''}`.trim(),
            email: profile.emails?.[0]?.value || '',
            avatar: profile.photos?.[0]?.value || '',
            experience: '',
            student: 'No',
            location: '',
            website: '',
            portfolio: '',
            github: '',
            bio: '',
            terms: true,
            role: ['user']
          })

          await user.save()
        }

        // 3. Generate JWT token
        const token = await tokenSign(user)

        // 4. Pass user and token to next middleware
        return done(null, { user, token })
      } catch (error) {
        console.error('Error in Google Strategy:', error)
        done(error, null)
      }
    }
  )
)
