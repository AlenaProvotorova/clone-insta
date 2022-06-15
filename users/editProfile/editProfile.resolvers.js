import client from "../../client"
import bcrypt from 'bcrypt'
import { protectedResolvers } from "../users.utils"

export default {
    Mutation: {
        editProfile: protectedResolvers(async (
            _, 
            {firstName, lastName, userName, email, password: newPassword},
            {loggedInUser}
            ) => {
        let hashedPassword = null
        if(newPassword) {
            hashedPassword = await bcrypt.hash(newPassword, 10)
        }
        const editedUser = await client.user.update({
            where: {id: loggedInUser.id}, 
            data: {firstName, lastName, userName, email, ...(hashedPassword && {password: hashedPassword})}
        })

        if(editedUser.id) {
            return {ok: true}
        } else {
            return {ok: false, error: 'Не получиловь обновить профиль'}
        }
        })
    }  
}