import bcryptjs from 'bcryptjs'

// NOTE: Function to hash a plain text password
// Uses bcryptjs with a salt of 10 rounds for secure password storage.
export const encrypt = async (passwordPlain) => {
  const hash = await bcryptjs.hash(passwordPlain, 10)
  return hash
}

// NOTE: Function to compare a plain text password with a hashed password
// Returns true if they match, false otherwise.
export const compare = async (passwordPlain, hashPassword) => {
  return await bcryptjs.compare(passwordPlain, hashPassword)
}
