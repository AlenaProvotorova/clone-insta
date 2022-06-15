import client from "../../client"
import bcrypt from 'bcrypt'
import { protectedResolvers } from "../users.utils"
import {createWriteStream} from 'fs'

export default {
    Mutation: {
        editProfile: protectedResolvers(async (
            _, 
            {firstName, lastName, userName, email, bio, avatar, password: newPassword },
            {loggedInUser}
            ) => {
                let avatarUrl = null
        if(avatar) {
        // TODO use cloud store for files
        const {filename, createReadStream} = await avatar
        const readStream = createReadStream()
        const newFileName = `${loggedInUser.id}-${Date.now()}-${filename}`
        const writeStream = createWriteStream(process.cwd() + "/uploads/" + newFileName)
        readStream.pipe(writeStream)
        avatarUrl = `http://localhost:4000/static/${newFileName}`
        }
       
        let hashedPassword = null
        if(newPassword) {
            hashedPassword = await bcrypt.hash(newPassword, 10)
        }
        const editedUser = await client.user.update({
            where: {id: loggedInUser.id}, 
            data: {firstName, lastName, userName, email, bio,
                ...(avatarUrl && {avatar: avatarUrl}),
                 ...(hashedPassword && {password: hashedPassword})}
        })

        if(editedUser.id) {
            return {ok: true}
        } else {
            return {ok: false, error: 'Не получиловь обновить профиль'}
        }
        })
    }  
}