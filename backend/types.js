const z = require('zod');

export const signupType = z.object({
    username: z.string().email(),
    firstName: z.string(),
    lastName: z.string(),
    password: z.string().min(8, {message: 'Passowrd must be of atleast 8 characters'})

})

export const signInType = z.object({
    username: z.string().email(),
    password: z.string()
})