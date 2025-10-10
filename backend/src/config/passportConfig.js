import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import dotenv from 'dotenv'
import User from '../models/userModels.js'

dotenv.config()

passport.use(
  new GoogleStrategy(
    {
      // Configurazione delle credenziali Google
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ['profile', 'email']
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Cerca l'autore nel database usando l'ID Google
        let user = await User.findOne({ googleId: profile.id })

        // Se l'autore non esiste, creane uno nuovo
        if (!user) {
          user = new User({
            googleId: profile.id,
            name: `${profile.name?.givenName || ''} ${profile.name?.familyName || ''}`.trim(),
            email: profile.emails?.[0]?.value || '',
            avatar: profile.photos?.[0]?.value || '',
            experience: null,
            terms: true,
            role: ['user']
          })

          await user.save()
        }

        done(null, user)
      } catch (error) {
        done(error, null)
      }
    }
  )
)
