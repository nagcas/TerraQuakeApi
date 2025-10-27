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
        // Extract user data from Google profile
        const email = profile.emails?.[0]?.value || ''
        const googleId = profile.id

        // Check if a user with this Google ID already exists
        let user = await User.findOne({ googleId })

        // If no user found, check if the email is already registered with another provider
        if (!user && email) {
          const existingUser = await User.findOne({ email })

          if (existingUser && !existingUser.googleId) {
            // If the email belongs to an account not linked to Google, stop and return an error
            return done(
              new Error(
                'An account with this email already exists. Please log in using your original provider (GitHub or email/password).'
              ),
              null
            )
          }

          // If no conflict, create a new user account linked to Google
          user = new User({
            googleId,
            name: `${profile.name?.givenName || ''} ${profile.name?.familyName || ''}`.trim(),
            email,
            avatar: profile.photos?.[0]?.value || '',
            experience: '',
            student: 'No',
            location: '',
            website: '',
            portfolio: '',
            github: '',
            linkedin: '',
            bio: '',
            terms: true,
            role: ['user']
          })

          await user.save()
        }

        // Generate JWT token for authenticated user
        const token = await tokenSign(user)

        // Pass user and token to next middleware
        return done(null, { user, token })
      } catch (error) {
        console.error('Error in Google Strategy:', error)
        return done(error, null)
      }
    }
  )
)
