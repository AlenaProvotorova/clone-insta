import client from "../../client"
import bcrypt from 'bcrypt'

export default {
    Mutation: {
        editProfile: async (_, {firstName, lastName, userName, email, password: newPassword}) => {
        let hashedPassword = null
        if(newPassword) {
            hashedPassword = await bcrypt.hash(newPassword, 10)
        }

        const editedUser = client.user.update({
            where: {id: 1}, 
            data: {firstName, lastName, userName, email, ...(hashedPassword && {password: hashedPassword})}
        })

        if(editedUser.id) {
            return {ok: true}
        } else {
            return {ok: false, error: 'Не получиловь обновить профиль'}
        }
        }
    }  
}