const z = require('zod');

const signupType = z.object({
    userName: z.string().email(),
    firstName: z.string(),
    lastName: z.string(),
    password: z.string().min(8, {message: 'Passowrd must be of atleast 8 characters'})

})

const signInType = z.object({
    userName: z.string().email(),
    password: z.string()
})

const updateBody = z.object({
    userName: z.string().optional(),   
    password: z.string().optional(),
    firstName: z.string().optional()
})

module.exports = {signupType, signInType, updateBody}