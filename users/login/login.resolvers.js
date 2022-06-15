import client from '../../client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export default {
    Mutation: {
        login: async (_, {userName, password}, {protectResolvers}) => {

            const user = await client.user.findFirst({
                where: {userName}
            })
            if (!user) {
                return {ok: false, error: 'Пользователь не найден'}
            }

            const isPasswordCorrect = await bcrypt.compare(password, user.password)
            if(!isPasswordCorrect) {
                return {ok: false, error: 'Пароль не верный!'}
            }

            const token = jwt.sign({id: user.id}, process.env.SECRET_KEY)
            return {ok: true, token}
        }
    }  
}