import client from '../../client'
import bcrypt from 'bcrypt'

export default {
    Mutation: {
        createAccount: async(_, {firstName, lastName, userName, email, password}) => {
            try {
                const existingUser = await client.user.findFirst({
                where: {
                        OR: [{userName}, {email}],
                    }
                })
                if (existingUser) {
                    throw new Error("Пользователь с указанными userNmae или email уже существует")
                }
                
                const hashedPassword = await bcrypt.hash(password, 10)
                
                await client.user.create({data: {
                    firstName, lastName, userName, email, password: hashedPassword
                }})

                return {ok: true}
            } catch (error) {
                return {ok: false, error}
            }
        },
    }  
}